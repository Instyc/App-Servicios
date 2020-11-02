import React, {useEffect,useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

//Material-UI
import {Paper, List, ListItem, Collapse, ListItemText, Grid, Typography, Button, Tooltip, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';
import {ExpandLess, ExpandMore}  from '@material-ui/icons';
import Ojo from '@material-ui/icons/Visibility';
import Flechita from '@material-ui/icons/ArrowForwardIos';
import Aceptar from '@material-ui/icons/Check';
import Rechazar from '@material-ui/icons/Clear';

import Estilos from '../Estilos.js';
import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function GestionarReportes({estadoReporte, reportes, modificarReporte}) {
    const classes = Estilos();
    const [titulo, setTitulo] = useState("");

    
    useEffect(()=>{
        //Dependiendo de si accedemos a los reclamos en espera, al historial de reclamos o a los reclamos nuevos, se muestra el título correspodiente
        if(estadoReporte===0)
            setTitulo("Reportes pendientes de moderación");
        else if(estadoReporte===1)
            setTitulo("Reportes en espera");
        else
            setTitulo("Historial de reportes");
        
    },[])  

    useEffect(()=>{
        console.log(reportes)
    },[reportes])

  
  return (
    <div className={classes.fondo}>
      <Paper elevation={5}>
        <Grid className={classes.filaPublicacion}  container justify="center">
            <Typography variant="h4" component="h1" align="left">
                {titulo}
            </Typography>
            <Grid item xs={12}>
                {
                    reportes.map((datos, i) =>
                        <Reporte key={i} datos={datos} modificarReporte={modificarReporte}/>
                    )
                }
            </Grid>
        </Grid>
      </Paper>
    </div>
  );
}


function Reporte({datos, modificarReporte}) {
    const classes = Estilos();
    let color;
    switch (datos.estado) {
        case -1:
            color = "cian"
            break;
        case 0:
            color = "gray"
            break;
        case 1:
            color = "yellow"
            break;
        case 2:
            color = "#FFDED3"
            break;
        default:
            color = "#D6FFD3"
            break;
    }
    return (
        <Paper className={classes.filaPublicacion} style={{background: color}} variant="outlined" square>
            <Grid container direction="row" justify="center">             
                <Grid item xs={12} lg={9} md={9} sm={12}>
                    <Button disabled>
                        <Typography color="secondary" variant="h5" component="h2" align="left" >
                            {datos.Solicitud_id.titulo}
                        </Typography>
                    </Button>

                    <Link to={"/publicacion/"+datos.Solicitud_id.id} className={classes.EstiloLink}>
                        <Tooltip title="Vista previa">
                            <Button><Ojo color="primary" /></Button>
                        </Tooltip>
                    </Link>
                        
                    <Button disabled>
                        <Flechita/>
                    </Button>
                  
                    <Link to={"/perfil-proveedor/"+datos.Usuario_id.id} className={classes.EstiloLink}>
                        <Button className={classes.button}>
                            <Typography variant="h6" component="h5" align="left">
                                {`${datos.Usuario_id.nombre} ${datos.Usuario_id.apellido}`}
                            </Typography>
                        </Button>
                    </Link>
                </Grid>

                <Grid item xs={12} lg={3} md={3} sm={12}>
                    <Typography variant="h6" component="h5" align="right">
                        {datos.created_at.split("T")[0]}
                    </Typography>
                </Grid>
                
                
                <Grid item xs={12}>
                    <Typography variant="h6" component="h5" align="left">
                        Motivos del reporte:
                    </Typography>
                </Grid>
                
                <Grid container direction="row" justify="center">
                    {
                        datos.motivos.map((motivo, i)=>(
                            <Grid key={i} item xs={6} sm={3} md={3} lg={3}>
                                <Typography variant="h6" component="h3" align="center">
                                    {
                                        motivo.nombre
                                    }
                                </Typography>
                            </Grid>
                        ))
                    }
                </Grid>
                
                <Grid item xs={12}>
                    <DesplegarInformacion datos={datos} modificarReporte={modificarReporte}/>
                </Grid>
            </Grid>
        </Paper>
    );
}

  
function DesplegarInformacion({datos, modificarReporte}) {
    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
    const [open, setOpen] = useState(false);
    const [accion, setaccion] = useState(false);
    const classes = Estilos();

    const handleClick = () => {
        setOpen(!open);
    };

    function enviarDatos(descripcion, aceptado){
        let auth = 'Bearer '+state.jwt;
        let estado = 2
        if(aceptado){
            if(accion){
                estado = 1
            }else{
                estado = 3
            }
        }

        if(aceptado===true){
            axios.post(
                state.servidor+"/api/notificaciones/",{
                    tipo: 0,
                    emisor: state.datosSesion.id,
                    receptor: datos.Usuario_id.id,
                    solicitud: datos.Solicitud_id!==null?datos.Solicitud_id.id:null,
                    datos_notificacion: descripcion,
                    leido: false
                },{
                    headers: {'Authorization': auth},
            })
            .then(response => {
                console.log("Se ha podido crear la notificacion: ",response.data)
                actualizarReporte(response.data.id, descripcion, estado)
            })
            .catch(error => {
                console.log("Error, no se ha podido crear la notificacion.", error.response)
                alert("Error, no se ha podido crear la notificacion.")
            })
        }else{
            actualizarReporte(null, descripcion, estado)
        }
        
    }
    function actualizarReporte(notificacion, descripcion, estado){
        let auth = 'Bearer '+state.jwt;
        axios.put(
            state.servidor+"/api/reportes/"+datos.id,{
                accion: accion,
                estado: estado,
                notificacion: notificacion,
                Administrador_id: state.datosSesion.id
            },{
                headers: {'Authorization': auth},
        })
        .then(response => {
            console.log("Se ha podido crear el reporte: ",response.data)
            modificarReporte(response.data)
        })
        .catch(error => {
            console.log("Error, no se ha podido crear el reporte.", error.response)
            alert("Error, no se ha podido crear el reporte.")
        })
    }

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemText primary="Desplegar información"/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <hr/>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="span" align="justify"> 
                            {datos.descripcion.length!==0?datos.descripcion:"El usuario no ha proporcionado información adicional."}
                        </Typography> 
                    </Grid>
                    <hr/>
                    
                    {
                        datos.estado<=0 && <FormControl component="fieldset" align="left">
                            <FormLabel required component="legend">Acción</FormLabel>
                                <RadioGroup disabled={datos.estado>0} row aria-label="Accion" value={accion} onChange={(e)=>{setaccion(!accion)}}>
                                    <FormControlLabel value="true" checked={accion} control={<Radio />} label="Pausar publicación" />
                                    <FormControlLabel value="false" checked={!accion} control={<Radio />} label="No hacer nada" />
                                </RadioGroup>
                        </FormControl>
                    }
                    {
                        datos.estado>0 && <Typography variant="h6" component="h5" align="left">
                            {datos.accion?"La publicación fue pausada":"No se pausó la publicación"}
                        </Typography>
                    }

                    <div hidden={datos.estado>0}>
                        <ParteNuevos enviarDatos={enviarDatos}/>
                    </div>
                    
                    <div hidden={datos.estado<=0}>
                        <ParteEspera_Historial datos={datos.notificacion}/>
                    </div>
                </List>
            </Collapse>
        </div>
    )
}

const ParteNuevos = ({enviarDatos}) =>{
    const [descripcion, setdescripcion] = useState("")
    return(
        <div>
            <Grid item xs={12}>
                <TextField
                onChange={(e)=>{setdescripcion(e.target.value)}}
                value={descripcion}
                id="outlined-basic"
                label="Agregar mensaje"
                multiline variant="outlined"
                size="medium"
                fullWidth/> 
            </Grid>

            <div align="center">
                <Button startIcon={<Aceptar/>} onClick={()=>{enviarDatos(descripcion, true)}}>
                    Aceptar reclamo
                </Button>
                <Button color="secondary" startIcon={<Rechazar/>} onClick={()=>{enviarDatos(descripcion, false)}}>
                    Descartar reclamo
                </Button>
            </div>
        </div>
    )
}

const ParteEspera_Historial = ({datos}) =>{
    return(
        datos.map((notif, i)=>(
            <div key={i}>
                <hr/>
                <Grid container justify="center">
                    <Grid item xs={9}>
                        <Typography color="secondary" variant="h5" component="h4" align="left" >
                            Mensaje del administrador
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" component="h5" align="right">
                            {notif.created_at.split("T")[0]}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {notif.datos_notificacion}
                    </Grid>
                </Grid>
            </div>
        ))
    )
}
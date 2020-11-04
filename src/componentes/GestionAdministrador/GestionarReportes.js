import React, {useEffect,useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

//Material-UI
import {LinearProgress, Paper, List, ListItem, Collapse, ListItemText, Grid, Typography, Button, Tooltip, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';
import {ExpandLess, ExpandMore}  from '@material-ui/icons';
import Ojo from '@material-ui/icons/Visibility';
import Flechita from '@material-ui/icons/ArrowForwardIos';
import Aceptar from '@material-ui/icons/Check';
import Rechazar from '@material-ui/icons/Clear';
import Alerta from '@material-ui/lab/Alert';

import Estilos from '../Estilos.js';
import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function GestionarReportes({estadoReporte, reportes, modificarReporte, cargando}) {
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
  
  return (
    <div className={classes.fondo} >
      <Paper elevation={5}>
        <Grid className={classes.filaPublicacion}  container justify="center">
            <Grid item xs={12}>
                <Typography variant="h4" component="h1" align="center">
                    {titulo}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <br/>
                {
                    !cargando && reportes.length===0 && (<Alerta variant="outlined" severity="info">
                    No hay reportes para mostrar.
                    </Alerta>)
                }  
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
            color = "#5d9b9b"
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
        case 3:
            color = "#D6FFD3"
            break;
    }
    return (
        <Paper className={classes.filaPublicacion} style={{background: color}} variant="outlined" square>
            <Grid container direction="row" justify="center">
                <Grid item xs={12} lg={9} md={9} sm={12}>
                    <Button disabled>
                        <Typography color="secondary" variant="h5" component="h2" align="left" >
                            {datos.Solicitud_id===null?"Reporte al usuario ":datos.Solicitud_id.titulo}
                        </Typography>
                    </Button>

                    {
                        datos.Solicitud_id!==null &&
                        <Link to={"/publicacion/"+datos.Solicitud_id.id} className={classes.EstiloLink}>
                            <Tooltip title="Vista previa">
                                <Button><Ojo color="primary" /></Button>
                            </Tooltip>
                        </Link>
                    }
                        
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
    const [cargando, setcargando] = useState(false);

    const classes = Estilos();

    const handleClick = () => {
        setOpen(!open);
    };

    function enviarDatos(descripcion, aceptado){
        setcargando(true)
        let auth = 'Bearer '+state.jwt;
        let estado = 2
        let datosNoti = "Su "+(datos.Solicitud_id!==null?"publicación":"perfil")+" tiene una sugerencia de modificación. \nMensaje de la administración: "+descripcion
        
        /**
         * estado:-1 ->Reporte respondido por el usuario
         * estado: 0 ->Reporte esperando a ser atendido
         * estado: 1 ->Reporte en espera, el proveedor debe modificar su perfil/publicación
         * estado: 2 ->Reporte rechazado
         * estado: 3 ->Reporte concluido
         */

        //Si se acepta el reporte
        if(aceptado){
            //Si la acción tomada es pausar la publicación o continuar con la pausa
            if(accion){
                //El estado se setea en "en espera de respuesta"
                estado = 1
                datosNoti = datos.Solicitud_id!==null?
                "Su publicación ha sido pausada por un administrador, deberá modificarla para que vuelva a estar disponible al público. \nMensaje de la administración: "+descripcion:
                "Su perfil ha sido bloqueado por un adminitrador, deberá modificarlo para que vuelva a estar disponible al público. \nMensaje de la administración: "+descripcion
                //Bloqueamos la publicación, si es que ya no lo está
                if(datos.estado!==-1)
                    cambiarVariableBloqueado(datos, true)
            //Si no se pausa o se despausa
            }else{
                //El estado se setea en "concluído"
                estado = 3
                //Si el estado del reporte era "respondido", se desbloquea la publicación
                if(datos.estado===-1){
                    cambiarVariableBloqueado(datos, false)
                    aceptado = true
                    datosNoti = datos.Solicitud_id!==null?"¡Su publicación se encuentra nuevamente disponible!":"¡Su perfil se encuentra nuevamente disponible!"
                }
            }
        }
        
        //Si aceptado es true, entonces el reporte es aceptado y se le notifica al usuario
        if(aceptado===true){
            axios.post(
                state.servidor+"/api/notificaciones/",{
                    tipo: 0,
                    emisor: state.datosSesion.id,
                    receptor: datos.Usuario_id.id,
                    solicitud: datos.Solicitud_id!==null?datos.Solicitud_id.id:null,
                    datos_notificacion: datosNoti,
                    leido: false
                },{
                    headers: {'Authorization': auth},
            })
            .then(response => {
                console.log("Se ha podido crear la notificacion: ",response.data)
                if (datos.estado!==-1)
                    actualizarReporte(response.data.id, estado)
            })
            .catch(error => {
                console.log("Error, no se ha podido crear la notificacion.", error.response)
                alert("Error, no se ha podido crear la notificacion.")
            })
        }else{
            //Si aceptado es false, entonces el reporte es descartado, luego se actualiza el estado del reporte
            actualizarReporte(null, estado)
        }
    }

    function actualizarReporte(notificacion, estado){
        let auth = 'Bearer '+state.jwt;
        axios.put(
            state.servidor+"/api/reportes/"+datos.id,{
                accion: accion,
                estado: estado,
                notificacion: notificacion,
                Administrador_id: state.datosSesion.id
            },{headers: {'Authorization': auth},
        })
        .then(response => {
            console.log("Se ha podido crear el reporte: ",response.data)
            setcargando(false)

            /*El siguiente método actualiza el arreglo de objetos de reporte del componente pestanaReportes, 
            con el objetivo de que el reporte cambie de estado y se muestre en su respectivo tab*/
            modificarReporte(response.data)
        })
        .catch(error => {
            console.log("Error, no se ha podido crear el reporte.", error.response)
            alert("Error, no se ha podido crear el reporte.")
        })
    }
    
    function cambiarVariableBloqueado(datos, bool){
        let auth = 'Bearer '+state.jwt;
        let ruta = datos.Solicitud_id===null?"users/":"api/solicitud/"
        let _id = datos.Solicitud_id===null?datos.Usuario_id.id:datos.Solicitud_id.id
        console.log(state.servidor+"/"+ruta+_id)
        axios.put(
            state.servidor+"/"+ruta+_id,{
                bloqueado: bool,
            },{headers: {'Authorization': auth},})
        .then(response => {
            console.log("Se ha podido bloquear",response.data)
        })
        .catch(error => {
            console.log("Error, no se ha podido bloquear.", error.response)
            alert("Error, no se ha podido bloquear .")
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
                                    <FormControlLabel
                                    value="true"
                                    checked={accion}
                                    control={<Radio />}
                                    label={datos.estado===-1?"Continuar con la publicación pausada":"Pausar publicación"} />
                                    <FormControlLabel
                                    value="false"
                                    checked={!accion}
                                    control={<Radio />}
                                    label={datos.estado===-1?"Despausar publicación":"No hacer nada"} />
                                </RadioGroup>
                        </FormControl>
                    }
                    {
                        datos.estado>0 && <Typography variant="h6" component="h5" align="left">
                            {datos.accion?"La publicación fue pausada":"No se pausó la publicación"}
                        </Typography>
                    }
                    {
                        cargando && <LinearProgress />
                    }
                    <div hidden={datos.estado>0}>
                        {
                            datos.estado===-1 && <ParteEspera_Historial datos={datos.notificacion}/>
                        }
                        <ParteNuevos enviarDatos={enviarDatos} cargando={cargando} esRespuesta={datos.estado===-1}/>
                    </div>
                    
                    <div hidden={datos.estado<=0}>
                        <ParteEspera_Historial datos={datos.notificacion}/>
                    </div>
                </List>
            </Collapse>
        </div>
    )
}

const ParteNuevos = ({enviarDatos, cargando, esRespuesta}) =>{
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
                <Button disabled={cargando} startIcon={<Aceptar/>} onClick={()=>{enviarDatos(descripcion, true)}}>
                    {esRespuesta?"Confirmar acción":"Aceptar reclamo"}
                </Button>
                <Button disabled={cargando} color="secondary" startIcon={<Rechazar/>} onClick={()=>{enviarDatos(descripcion, false)}}>
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
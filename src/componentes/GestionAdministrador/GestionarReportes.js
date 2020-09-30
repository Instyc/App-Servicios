import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

//Material-UI
import {Paper, List, ListItem, Collapse, ListItemText, Grid, Typography, Button, Tooltip, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';
import {ExpandLess, ExpandMore}  from '@material-ui/icons';
import Ojo from '@material-ui/icons/Visibility';
import Flechita from '@material-ui/icons/ArrowForwardIos';
import Aceptar from '@material-ui/icons/Check';
import Rechazar from '@material-ui/icons/Clear';

import Estilos from '../Estilos.js';

export default function GestionarReportes({estadoReporte}) {
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
    <div className={classes.margenArriba}>
      <Paper elevation={5}>
        <Grid className={classes.filaPublicacion} container justify="center">
            <Typography variant="h4" component="h1" align="left">
                {titulo}
            </Typography>
            <Grid item xs={12}>
                <Reporte color="#FFDED3" estadoReporte={estadoReporte}/>
                <Reporte color="#D6FFD3" estadoReporte={estadoReporte}/>
                <Reporte color="#FFDED3" estadoReporte={estadoReporte}/>
                <Reporte color="#D6FFD3" estadoReporte={estadoReporte}/>
            </Grid>
        </Grid>
      </Paper>
    </div>
  );
}


function Reporte({color, estadoReporte}) {
    const classes = Estilos();
    const motivos = [
        "Motivo 1",
        "Motivo 2",
        "Motivo 3",
        "Motivo 4",
        "Motivo 5",
        "Motivo 6",
    ]
    return (
        <Paper className={classes.filaPublicacion} style={{background: color}} variant="outlined" square>
            <Grid container direction="row" justify="center">             
                <Grid item xs={9}>
                    <Button disabled>
                        <Typography color="secondary" variant="h5" component="h2" align="left" >
                            Publicacion X
                        </Typography>
                    </Button>

                    <Link to="/publicacion" className={classes.EstiloLink}>
                        <Tooltip title="Vista previa">
                            <Button><Ojo color="primary" /></Button>
                        </Tooltip>
                    </Link>
                        
                    <Button disabled>
                        <Flechita/>
                    </Button>
                    
                    <Link to="/perfil-proveedor" className={classes.EstiloLink}>
                        <Button className={classes.button}>
                            <Typography variant="h6" component="h5" align="left">
                                Proveedor de servicios
                            </Typography>
                        </Button>
                    </Link>
                </Grid>

                <Grid item xs={3}>
                    <Typography variant="h6" component="h5" align="right">
                        05/05/5005
                    </Typography>
                </Grid>
                
                
                <Grid item xs={12}>
                    <Typography variant="h6" component="h5" align="left">
                        Opciones señaladas
                    </Typography>
                </Grid>
                
                <Grid container direction="row" justify="space-around">
                    {
                        motivos.map((motivo, i)=>(
                            <Grid item xs={3}>
                                <Typography key={i} variant="h7" component="h3" align="left">
                                    {
                                        motivo
                                    }
                                </Typography>
                            </Grid>
                        ))
                    }
                </Grid>
                
                <Grid item xs={12}>
                    <DesplegarInformacion estadoReporte={estadoReporte}/>
                </Grid>
            </Grid>
        </Paper>
    );
}

  
function DesplegarInformacion({estadoReporte}) {
    const [open, setOpen] = React.useState(false);
    const classes = Estilos();

    const handleClick = () => {
        setOpen(!open);
    };
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
                        <Typography variant="body1" component="p" align="justify"> 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat provident tempore incidunt eaque, dolor aliquid placeat architecto quaerat commodi distinctio dignissimos id dicta voluptatem fuga laborum vel sunt. Aspernatur, libero.Soluta vero vitae voluptas molestiae facere laborum laudantium at numquam assumenda perspiciatis nisi ipsum, ullam reprehenderit quae pariatur asperiores fugiat sequi delectus molestias neque. Fugit minus debitis possimus magni laborum!
                        </Typography> 
                    </Grid>
                    <hr/>
                    <FormControl component="fieldset" align="left">
                        <FormLabel component="legend">Acción</FormLabel>
                            <RadioGroup row aria-label="Accion">
                                <FormControlLabel value="valor1" control={<Radio />} label="Pausar publicacion" />
                                <FormControlLabel value="valor2" control={<Radio />} label="No hacer nada" />
                            </RadioGroup>
                    </FormControl>
                    <div hidden={estadoReporte>0}>
                        <ParteNuevos/>
                    </div>
                    <div hidden={estadoReporte===0}>
                        <ParteEspera_Historial/>
                    </div>
                </List>
            </Collapse>
            
        </div>
    )
}

const ParteNuevos = () =>{
    return(
        <div>
            <Grid item xs={12}>
                <TextField id="outlined-basic" label="Agregar mensaje" multiline variant="outlined" size="medium" fullWidth> 
                    
                </TextField> 
            </Grid>

            <div align="center">
                <Button startIcon={<Aceptar/>}>
                    Aceptar reclamo
                </Button>
                <Button color="secondary" startIcon={<Rechazar/>}>
                    Descartar reclamo
                </Button>
            </div>
        </div>
    )
}

const ParteEspera_Historial = () =>{
    return(
        <div>
            <Typography color="secondary" variant="h5" component="h4" align="left" >
                Mensajes del administrador:
            </Typography>
            <hr/>
            <Grid item xs={3}>
                <Typography variant="h6" component="h5" align="left">
                    Enviado 05/05/2020
                </Typography>
            </Grid>
            <Grid item xs={12}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat provident tempore incidunt eaque, dolor aliquid placeat architecto quaerat commodi distinctio dignissimos id dicta voluptatem fuga laborum vel sunt. Aspernatur, libero.Soluta vero vitae voluptas molestiae facere laborum laudantium at numquam assumenda perspiciatis nisi ipsum, ullam reprehenderit quae pariatur asperiores fugiat sequi delectus molestias neque. Fugit minus debitis possimus magni laborum!
            </Grid>
            <hr/>
            <Grid item xs={3}>
                <Typography variant="h6" component="h5" align="left">
                    Enviado 05/05/2020
                </Typography>
            </Grid>
            <Grid item xs={12}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat provident tempore incidunt eaque, dolor aliquid placeat architecto quaerat commodi distinctio dignissimos id dicta voluptatem fuga laborum vel sunt. Aspernatur, libero.Soluta vero vitae voluptas molestiae facere laborum laudantium at numquam assumenda perspiciatis nisi ipsum, ullam reprehenderit quae pariatur asperiores fugiat sequi delectus molestias neque. Fugit minus debitis possimus magni laborum!
            </Grid>
        </div>
    )
}
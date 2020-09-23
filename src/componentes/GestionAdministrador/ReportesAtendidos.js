import React,{useState, useEffect} from 'react';
//Estilos Material-UI
import {Collapse, ListItemText, ListItem, List, Paper,Grid ,Typography, Button, Tooltip, TextField, Radio, RadioGroup,FormControlLabel, FormControl, FormLabel} from '@material-ui/core/';
import {ExpandLess, ExpandMore} from '@material-ui/icons/';
import Ojo from '@material-ui/icons/Visibility';
import Flechita from '@material-ui/icons/ArrowForwardIos';

import Estilos from '../Estilos.js'

export default function ReportesAtendidos({estadoReporte}) {
    const classes = Estilos();
    const [titulo, setTitulo] = useState("");
    
    useEffect(()=>{
        //Dependiendo de si accedemos a los reclamos en espera o al historial de reclamos, se muestra el título correspodiente
        if(estadoReporte){
            setTitulo("Historial de reportes");
        }else{
            setTitulo("Reportes en espera");
        }
    },[])  

    return (
        <div className={classes.margenArriba}>
        <Paper elevation={5}>
            <Grid className={classes.filaPublicacion} container justify="center">
                <Typography variant="h4" component="h1" align="left">
                    {titulo}
                </Typography>
                <Grid item xs={12}>
                    <Reporte color="#FFDED3"/>
                    <Reporte color="#D6FFD3"/>
                    <Reporte color="#FFDED3"/>
                    <Reporte color="#D6FFD3"/>
                </Grid>
            </Grid>
        </Paper>
        </div>
    );
}


function Reporte({color}) {
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
        <Paper className={classes.reporte} style={{background: color}} variant="outlined" square>
            <Grid container direction="row" justify="center">             
                <Grid item xs={9}>
                    <Button disabled>
                        <Typography color="secondary" variant="h5" component="h2" align="left" >
                            Publicacion X
                        </Typography>
                    </Button>
                    <Tooltip title="Vista previa">
                        <Button><Ojo color="primary" /></Button>
                    </Tooltip>
                        
                    <Button disabled>
                        <Flechita/>
                    </Button>
                    
                    <Button className={classes.button}>
                        <Typography variant="h6" component="h5" align="left">
                            Proveedor de servicios
                        </Typography>
                    </Button>
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
                    <DesplegarInformacion/>
                </Grid>
            </Grid>
        </Paper>
    );
}

  
function DesplegarInformacion() {
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
                        <FormLabel component="legend" >Acción</FormLabel>
                        <RadioGroup row aria-label="Acción elegida">
                            <FormControlLabel value="Pausar" control={<Radio />} label="Pausar publicacion" />
                            <FormControlLabel value="Nada" control={<Radio />} label="No hacer nada" />
                        </RadioGroup>
                    </FormControl>
                    
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
                </List>
            </Collapse>
        </div>
    )
}
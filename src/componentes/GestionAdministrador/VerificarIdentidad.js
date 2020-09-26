import React from 'react';

//Material-UI
import {Collapse, Switch, ListItemText, ListItem, List, Paper, Grid, Typography, Button, Tooltip, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core/';
import {Like, ExpandLess, ExpandMore} from '@material-ui/icons/';
import Dislike from '@material-ui/icons/ThumbDownAltTwoTone';
import Ojo from '@material-ui/icons/Visibility';
import Flechita from '@material-ui/icons/ArrowForwardIos';
import Aceptar from '@material-ui/icons/Check';
import Rechazar from '@material-ui/icons/Clear';

import Imagenes from 'react-lightbox-component';
import 'react-lightbox-component/build/css/index.css';

//Estilos
import Estilos from '../Estilos.js'

export default function VerificarIdentidad() {
  const classes = Estilos();
  return (
    <div className={classes.fondo}>
      <Paper elevation={5}  style={{margin:"10px 0px", padding:"20px"}}>
        <Grid container justify="center" spacing={2}>
            <Grid item xs={11}>
                <Typography variant="h4" component="h1" align="left">
                    Verificar identidad
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Tooltip title="Mostrar toda la informacion de las verificaciones">
                    <Switch
                        name="Desplegar"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Tooltip>
            </Grid>
            
            <Grid item xs={12}>
                <Solicitud/>
                <Solicitud/>
                <Solicitud/>
                <Solicitud/>
            </Grid>
        </Grid>
      </Paper>
    </div>
  );
}


function Solicitud() {
    const classes = Estilos();
    
    return (
        <Paper className={classes.filaPublicacion} variant="outlined" square>
            <Grid container direction="row" alignItems="center">
                <Grid item xs={12}>
                    <Button className={classes.button}>
                        <Typography variant="h5" component="h5" align="left">
                            Proveedor de servicios
                        </Typography>
                    </Button>
                    <Button disabled>
                        <Typography variant="h5" component="h2" align="left" >
                            DNI
                        </Typography>
                    </Button>
                </Grid>
    
                <Grid item xs={12}>
                    <DesplegarInformacion/>
                </Grid>       
                
            </Grid>
        </Paper>
    );
}

  
function DesplegarInformacion() {
    const classes = Estilos();
    const [open, setOpen] = React.useState(false);

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
                    <Grid container direction="row" alignItems="center" justify="center">
                        <Grid item xs={4} sm={12}>
                            <div align="center">
                                <Imagenes images={
                                    [{
                                        src: 'https://i1.wp.com/www.caninomag.es/wp-content/uploads/2018/05/2Dvs3D-1.jpg?fit=600%2C320&ssl=1',
                                        title: 'image title',
                                        description: 'image description'
                                        },{
                                        src: 'https://i1.wp.com/www.caninomag.es/wp-content/uploads/2018/05/2Dvs3D-1.jpg?fit=600%2C320&ssl=1',
                                        title: 'image title',
                                        description: 'image description'
                                        },{
                                        src: 'https://i1.wp.com/www.caninomag.es/wp-content/uploads/2018/05/2Dvs3D-1.jpg?fit=600%2C320&ssl=1',
                                        title: 'image title',
                                        description: 'image description'
                                    }] 
                                }
                                thumbnailWidth='100px'
                                thumbnailHeight='100px'
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                            id="outlined-basic"
                            label="Agregar mensaje"
                            multiline variant="outlined"
                            size="medium"
                            fullWidth
                            className={classes.inputAncho}
                            >
                            </TextField> 
                        </Grid>
                        <div align="center">
                            <Button startIcon={<Aceptar/>}>
                                Validar Identidad
                            </Button>
                            <Button color="secondary" startIcon={<Rechazar/>}>
                                Rechazar Solicitud
                            </Button>
                        </div>
                    </Grid>
                </List>
            </Collapse>
        </div>
    )
}
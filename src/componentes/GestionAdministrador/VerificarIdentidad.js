import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Like from '@material-ui/icons/ThumbUpAltTwoTone';
import Dislike from '@material-ui/icons/ThumbDownAltTwoTone';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Ojo from '@material-ui/icons/Visibility';
import Flechita from '@material-ui/icons/ArrowForwardIos';
import Estilos from '../Estilos.js'
import Switch from '@material-ui/core/Switch';
import Imagenes from 'react-lightbox-component';
import 'react-lightbox-component/build/css/index.css';

import Aceptar from '@material-ui/icons/Check';
import Rechazar from '@material-ui/icons/Clear';

export default function GestionarReportes() {
  const classes = Estilos();
  return (
    <div className={classes.margenArriba}>
      <Paper elevation={5}>
        <Grid className={classes.filaPublicacion} container justify="flex-start">
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
                                thumbnailWidth='150px'
                                thumbnailHeight='150px'
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                            id="outlined-basic"
                            label="Agregar mensaje"
                            multiline variant="outlined"
                            size="medium"
                            fullWidth>
                            className={classes.inputAncho}
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
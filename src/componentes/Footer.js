import React,{useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Instagram, Facebook} from '@material-ui/icons/';

//Material-UI
import {Typography, Grid, AppBar, Toolbar} from '@material-ui/core/';

import Estilos from './Estilos.js';
import { ObtenerEstadoAplicacion } from '../Estados/AplicacionEstado'

//Componente que se muestra en la sección más baja de todas las vistas, es decir, el footer
export default function Footer() {
    const classes = Estilos();
    const [contactanos, setcontactanos] = useState(false);
    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
    return (
        <div >
           <AppBar position="relative" bottom="0px" style={{zIndex: 0}}>   
                <Toolbar>
                    <Grid container direction="row" alignItems="center" justify="center">
                        <Grid item xs={12} sm={4} align="center">
                            {/*<Link className={classes.EstiloLink} to="/sobre-nosotros">Sobre nosotros</Link><br/>*/}
                            <Link className={classes.EstiloLink} to={state.ruta+"/preguntas-frecuentes"}>Preguntas frecuentes</Link>
                        </Grid>
                        <Grid item xs={12} sm={4} align="center">
                            {/*<Link className={classes.EstiloLink} to="/terminos-de-uso">Términos de uso</Link><br/>*/}
                            <a href="#" className={classes.EstiloLink} onClick={()=>{setcontactanos(!contactanos)}}>Contáctanos</a>
                            {
                                contactanos && <div>
                                    <a href="mailto:angelruggia@gmail.com" className={classes.EstiloLink}>angelruggia@gmail.com</a><br/>
                                    <a href="mailto:ferransolischorvat@gmail.com" className={classes.EstiloLink}>ferransolischorvat@gmail.com</a>
                                </div>
                            }
                        </Grid>
                        <Grid item xs={12} sm={4} align="center">
                            <Typography>
                                Nuestras redes
                            </Typography>
                            <a href="https://www.facebook.com/RuggiaAngel" target="_blank" className={classes.EstiloLink}><Facebook fontSize="large"/></a>
                            <a href="https://www.instagram.com/ferransolischorvat/" target="_blank" className={classes.EstiloLink}><Instagram fontSize="large"/></a>
                        </Grid>
                        
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>     
    );
  }
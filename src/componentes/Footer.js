import React,{useState} from 'react';
import {Link} from 'react-router-dom';

//Material-UI
import {Typography, Grid, AppBar, Toolbar} from '@material-ui/core/';

import Estilos from './Estilos.js';

export default function Footer() {
    const classes = Estilos();
    return (
        <div >
           <AppBar position="relative" bottom="0px" style={{zIndex: 0}}>   
                <Toolbar>
                    <Grid container direction="row" align="center">
                        <Grid item xs={12} sm={4}>
                            <Link className={classes.EstiloLink} to="/sobre-nosotros">Sobre nosotros</Link><br/>
                            <Link className={classes.EstiloLink} to="/preguntas-frecuentes">Preguntas frecuentes</Link>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Link className={classes.EstiloLink} to="/acerca-de">Términos de uso</Link><br/>
                            <Link className={classes.EstiloLink} to="/acerca-de">Contáctanos</Link>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography>Nuestras redes</Typography>
                        </Grid>
                        
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>     
    );
  }
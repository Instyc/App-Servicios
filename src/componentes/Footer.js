import React,{useState} from 'react';
import {Link} from 'react-router-dom';

//Material-UI
import {Typography, Grid, AppBar, Toolbar} from '@material-ui/core/';

import Estilos from './Estilos.js';

export default function Footer() {
    
    return (
        <div >
           <AppBar position="relative" style={{zIndex: 0}}>   
                <Toolbar style={{background:"green"}}>
                    <Grid container direction="row" align="center">
                        <Grid item xs={12} sm={4}>
                            <Link to="/sobre-nosotros">Sobre nosotros</Link><br/>
                            <Link to="/preguntas-frecuentes">Preguntas frecuentes</Link>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Link to="/acerca-de">Términos de uso</Link><br/>
                            <Link to="/acerca-de">Contáctanos</Link>
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
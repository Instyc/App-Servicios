import React,{useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Estilos from './Estilos.js';

export default function Footer() {
    
    return (
        <div >
           <AppBar position="relative" style={{zIndex: 0}}>   
                <Toolbar style={{background:"green"}}>
                    <Grid container direction="row" align="center">
                        <Grid item xs={12} sm={4}>
                            <Link to="/acerca-de">Sobre nosotros</Link><br/>
                            <Link to="/acerca-de">Preguntas frecuentes</Link>
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
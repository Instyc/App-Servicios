import React from 'react'
import Estilos from './Estilos.js';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import AlertaMensaje from './AlertaMensaje.js';
export default function ContactarProveedor() {
    const classes = Estilos();
    

    return (
        <div>
            <Grid  container direction="row" justify="center" alignItems="stretch">
                <Grid item xs={12}>
                    <div align="center">
                        <Avatar alt="Nombre proveedor" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR7Mt8wp9lo-dd73xpvjzPMcspQ8uwAThLitQ&usqp=CAU" className={classes.imagenPublicacion} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h2" align="center" className={classes.form}>
                        Nombre proveedor
                    </Typography>
                </Grid>

                <TextField className={classes.inputAncho} id="filled-basic" label="Escribe tu mensaje" variant="filled" multiline/>
                                
                <AlertaMensaje/>
                
            </Grid>
        </div>
    )
}
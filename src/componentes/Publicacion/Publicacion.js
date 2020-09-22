import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


import ProveedorInfo from './ProveedorInfo.js';
import PublicacionInfo from './PublicacionInfo.js';
import Opiniones from './Opiniones.js';
import Estilos from '../Estilos.js';
import ContactarProveedor from '../ContactarProveedor.js'
import {BotonContratar} from '../ContactarProveedor.js'

export default function Publicacion() {
    return (
        <div>
            <Grid  container direction="row" justify="center" alignItems="stretch">
                <Grid item md={8} xs={12}>
                  <PublicacionInfo/>
                  <Opiniones/>
                </Grid>  
                <Grid item md={4} xs={12} >
                    <ProveedorInfo/>
                </Grid>  
                <BotonContratar fijo={true}/> 
            </Grid>
        </div>
    )
}

/*function Contratar() {
  const classes = Estilos();

  return (
    <div className={classes.botonFijo}>
       <Button
        variant="contained"
        color="primary"
        startIcon={<Mail/>}
      >
        Contactar
      </Button>
    </div>
  );
}*/



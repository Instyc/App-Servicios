import React from 'react';

import Grid from '@material-ui/core/Grid';

import ProveedorInfo from '../Publicacion/ProveedorInfo.js';
import PublicacionInfo from '../Publicacion/PublicacionInfo.js';
import Estilos from '../Estilos.js';
import {BotonContratar} from '../ContactarProveedor.js'

export default function Publicacion() {
  const classes = Estilos();
    return (
        <div>
            <Grid container direction="row" justify="center" alignItems="stretch">
                <Grid item md={8} xs={12} >
                    <PublicacionInfo esDePerfil={true}/>
                </Grid> 
                <Grid item md={4} xs={12} >
                    <ProveedorInfo esDePerfil={true}/>
                </Grid>
                <BotonContratar fijo={true} esDePerfil={true}/> 
            </Grid>
        </div>
    )
}


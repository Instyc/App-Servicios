import React from 'react';

//Material-UI
import {Grid} from '@material-ui/core/';

//Componentes
import ProveedorInfo from './ProveedorInfo.js';
import PublicacionInfo from './PublicacionInfo.js';
import Opiniones from './Opiniones.js';
import Estilos from '../Estilos.js';
import {BotonContratar} from '../ContactarProveedor.js'

export default function Publicacion() {
  const classes = Estilos();
    return (
        <div>
            <Grid container direction="row" justify="center" alignItems="stretch">
                <Grid item md={8} xs={12}>
                  <PublicacionInfo esDePerfil={false}/>
                  <Opiniones/>
                </Grid>  
                <Grid item md={4} xs={12} >
                    <ProveedorInfo esDePerfil={false}/>
                </Grid>  
                <BotonContratar fijo={true} esDePerfil={false}/> 
            </Grid>
        </div>
    )
}

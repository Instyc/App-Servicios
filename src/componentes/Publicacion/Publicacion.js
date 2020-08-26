import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProveedorInfo from './ProveedorInfo';
import PublicacionInfo from './PublicacionInfo';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root:{
      
  }
}));


export default function Publicacion() {
    const classes = useStyles();
    return (
        <div >
            <Grid  container direction="row" justify="center">
                <Grid item md={8} xs={12}>
                    <PublicacionInfo/>
                </Grid>  
                <Grid item md={4} xs={12} >
                    <ProveedorInfo/>
                </Grid>   
            </Grid>
        </div>
    )
}

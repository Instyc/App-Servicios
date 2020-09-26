import React from 'react';
import {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import SeleccionarServicio from '../SeleccionarServicio.js';
 
import Estilos from '../Estilos.js'

export default function Filtro({servicios, agregarSeleccionado}) {
  const classes = Estilos();
  
  return (
    <Card className={classes.margenArriba} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Seleccione los filtros deseados
        </Typography>

        <Grid container className={classes.margenArriba} spacing={2} justify="space-around" alignItems="center">    
          {
            servicios.map((servicio,i) => (
              <Grid item xs={6} sm={4} md={3} lg={2}  key={i}>
                <SeleccionarServicio key={i} servicio={servicio} agregarSeleccionado={agregarSeleccionado}/>
              </Grid>
            ))
          }
        </Grid>
        
        <form className={classes.margenArriba} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Buscar por nombre" variant="outlined" size="medium" fullWidth />
        </form>
        <Button className={classes.margenArriba} color="secondary" variant="contained" >Buscar</Button>
      </CardContent>
    </Card>
  );
}
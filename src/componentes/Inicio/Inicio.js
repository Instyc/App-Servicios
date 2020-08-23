import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import BotonCategoria from './BotonCategoria.js';


export default function Inicio() {
  let arrayCategoria = [
    {
      nombre: "1",
      imagen: "1"
    },
    {
      nombre: "2",
      imagen: "2"
    },
    {
      nombre: "3",
      imagen: "3"
    },
    {
      nombre: "4",
      imagen: "4"
    }
  ];
  return (
    <div>
      
      <Typography component="h3" variant="h2">Servicios Saenz Peña</Typography>
      <Typography component="h4" variant="h5">¡Encuentra tu servicio ideal!</Typography>
      <Grid container spacing={3} justify="space-around">
        {
          arrayCategoria.map((cat, i) => (
            <Grid item xs={12} sm={6} md={4} xl={3}  key={i} >
              <BotonCategoria nombre={cat.nombre} imagen={cat.imagen} />
            </Grid>
          ))
        }
        </Grid>
    </div>
  );
}
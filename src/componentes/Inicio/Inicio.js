import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import BotonCategoria from './BotonCategoria.js';
import Divider from '@material-ui/core/Divider';

import Estilos from '../Estilos';

import {Link} from "react-router-dom";

export default function Inicio() {
  const classes = Estilos();
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
    },
    {
      nombre: "4",
      imagen: "4"
    },
    {
      nombre: "4",
      imagen: "4"
    },{
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
    },
    {
      nombre: "4",
      imagen: "4"
    },
    {
      nombre: "4",
      imagen: "4"
    },{
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
    },
    {
      nombre: "4",
      imagen: "4"
    },
    {
      nombre: "4",
      imagen: "4"
    }
  ];
  return (
    <div className={classes.mostrarFlex} >
      <Paper elevation={3} style={{width:950, padding: 15}}>      
      <Typography component="h3" variant="h4" align="center">Servicios Saenz Peña</Typography>
      <Typography component="h4" variant="h5" align="center">¡Encuentra tu servicio ideal!</Typography>
      <hr/>
      <Grid container spacing={5} justify="space-around" alignItems="center">
        {
          arrayCategoria.map((cat, i) => (
            <Grid item sm={4} md={3} lg={2} key={i} >
              <Link to="/publicaciones">
                <BotonCategoria nombre={cat.nombre} imagen={cat.imagen} />
              </Link>
              
            </Grid>
          ))
        }
        </Grid>
        <hr/>
      </Paper>
    </div>
  );
}
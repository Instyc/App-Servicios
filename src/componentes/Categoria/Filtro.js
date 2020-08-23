import React from 'react';
import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import FiltroServicio from './FiltroServicios.js';

const useStyles = makeStyles((theme) =>({
  root: {
    minWidth: 275,
    margin: 25
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
}));

export default function Filtro() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  
  const [arrayServicios, setArrayServicios] = useState(
    [
      {
        label: "Servicio 1"
      },
      {
        label: "Servicio 2"
      },
      {
        label: "Servicio 3"
      },
      {
        label: "Servicio 4"
      },
      {
        label: "Servicio 5"
      },
      {
        label: "Servicio 6"
      },
      {
        label: "Servicio 7"
      }
    ]
  )
  
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Seleccione los filtros deseados
        </Typography>

        <Grid container spacing={2} justify="space-around">    
          {
            arrayServicios.map((servicio,i) => (
              <Grid item xs={6} sm={4} md={3} lg={2}  key={i} >
                <FiltroServicio key={i} servicio={servicio.label} />
              </Grid>
            ))
          }
        </Grid>
        
        <form noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Buscar por nombre" variant="outlined" size="medium" fullWidth />
        </form>
        <Button color="secondary" variant="contained" >Buscar</Button>
      </CardContent>
    </Card>
  );
}
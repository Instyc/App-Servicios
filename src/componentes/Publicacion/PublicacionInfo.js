import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ImageGallery from 'react-image-gallery';
import Estrellas from '../Estrellas.js';

import ReportarPublicacion from './ReportarPublicacion.js'

import Estilos from '../Estilos.js';

export default function PublicacionInfo() {
  const classes = Estilos();

  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

  return (
    <div className={classes.mostrarFlex}>
      <Paper elevation={5} >
        <Grid className={classes.padding} container direction="row" justify="space-around" alignItems="center">
            <Grid item container xs={12} alignItems="flex-end" direction="column">
              
            </Grid>
            
            <Grid item xs={6} sm={5}>
                <Typography variant="h5" component="h1" align="left">
                    Titulo de la publicacion
                </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
                <Typography variant="h6" component="h3">
                    <Estrellas/>
                </Typography>
            </Grid>

            <Grid item xs={6} sm={2}>
              Falta Breadcrumbs
            </Grid>
            <Grid item xs={6} sm={1}>
                <ReportarPublicacion/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" component="h3" align="left">
                    Precio estimado: $500
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" component="p" align="justify"> 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id delectus rem, saepe accusamus maiores illo nam, ullam a quidem eos ducimus temporibus maxime aliquid autem, voluptate vero nostrum perferendis unde.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid similique unde sed dolore nesciunt alias sit sequi harum labore, vitae amet modi corporis distinctio eos aperiam. Dignissimos consequuntur atque esse.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ImageGallery items={images}/>
            </Grid>
            
        </Grid>
      </Paper>

    </div>
  );
}
import React from 'react';
//Material-UI
import {Paper, Grid, Typography, Breadcrumbs, Link, Avatar} from '@material-ui/core/';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import ImageGallery from 'react-image-gallery';
import Estrellas from '../Estrellas.js';
import ReportarPublicacion from './ReportarPublicacion.js'
import Estilos from '../Estilos.js';

export default function PublicacionInfo({esDePerfil}) {
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
        <Grid className={classes.padding} container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={12} hidden={!esDePerfil} className={esDePerfil && classes.EstiloMovil}>
              <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR7Mt8wp9lo-dd73xpvjzPMcspQ8uwAThLitQ&usqp=CAU" className={classes.imagenPublicacion} />
            </Grid>
            
            <Grid item xs={esDePerfil?10:6} sm={esDePerfil?11:7}>
                <Typography variant="h5" component="h1" align="left">
                    Titulo de la publicacion
                </Typography>
            </Grid>

            <Grid hidden={esDePerfil} item xs={6} sm={4} align-items="last baseline">
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit">Categoría</Link>
                <Link color="inherit">Servicio</Link>
              </Breadcrumbs>
            </Grid>
            
            <Grid item xs={esDePerfil?2:6} sm={1}>
                <ReportarPublicacion/>
            </Grid>
            <Grid item xs={6} hidden={esDePerfil}>
                <Typography variant="h6" component="h3" align="left">
                    Precio estimado: $500
                </Typography>
            </Grid>
            <Grid item xs={6} sm={6} hidden={esDePerfil}>
                <Typography variant="h6" component="h3">
                    <Estrellas/>
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
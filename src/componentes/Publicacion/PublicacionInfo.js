import React, {useState, useEffect} from 'react';
//Material-UI
import {Paper, Grid, Typography, Breadcrumbs, Link, Avatar, Tooltip} from '@material-ui/core/';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
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

  const [datosPagina, setDatosPagina] = useState({
    titulo:"",
    precio:"",
    categoria:"",
    servicio:"",
    estrella: 3,
    descripcion:"",
    imagenes:[""]
  });

  useEffect(()=>{
    //Dependiendo de si se hace referencia al perfil de un proveedor o a una publicación, se muestra la pantalla correspondiente
    if(esDePerfil){
      setDatosPagina({
        titulo:"Carlos Saragoza",
        precio:"",
        categoria:"",
        servicio:"",
        estrella: 0,
        descripcion:"Soy un ingeniero en aeronautica que se dedica...",
        imagenes:[""]
      })
    }else{
      setDatosPagina({
        titulo:"Reparación de caños",
        precio:"300",
        categoria:"Plomería",
        servicio:"Caños",
        estrella: 3.5,
        descripcion:"Se reparan caños a domicilio.",
        imagenes:[""]
      })
    }
},[])

  return (
    <div className={classes.mostrarFlex}>
      <Paper elevation={5} >
        <Grid className={classes.padding} container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={12} hidden={!esDePerfil} className={esDePerfil && classes.EstiloMovil}>
              <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR7Mt8wp9lo-dd73xpvjzPMcspQ8uwAThLitQ&usqp=CAU" className={classes.imagenPublicacion} />
            </Grid>
            
            <Grid item xs={esDePerfil?10:6} sm={esDePerfil?11:7}>
                <Typography variant="h5" component="h1" align="left" alignContent="center">
                  {datosPagina.titulo}
                  <Tooltip title="Usuario verificado">
                    <CheckCircleOutlineIcon color="primary"/>
                  </Tooltip>
                </Typography>
            </Grid>

            <Grid hidden={esDePerfil} item xs={6} sm={4} align-items="last baseline">
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit">{datosPagina.categoria}</Link>
                <Link color="inherit">{datosPagina.servicio}</Link>
              </Breadcrumbs>
            </Grid>
            
            <Grid item xs={esDePerfil?2:6} sm={1}>
              <ReportarPublicacion esDePerfil={esDePerfil}/>
            </Grid>
            <Grid item xs={6} hidden={esDePerfil}>
                <Typography variant="h6" component="h3" align="left">
                    Precio estimado: ${datosPagina.precio}
                </Typography>
            </Grid>
            <Grid item xs={6} sm={6} hidden={esDePerfil}>
                <Typography variant="h6" component="h3">
                    <Estrellas valor={datosPagina.estrella}/>
                </Typography>
            </Grid>
            
            <Grid item xs={12}>
                <Typography variant="body1" component="p" align="justify"> 
                  {datosPagina.descripcion}    
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
import React, {useState, useEffect, useContext} from 'react';
//Material-UI
import {Hidden, Paper, Grid, Typography, Breadcrumbs, Link, Avatar, Tooltip, IconButton} from '@material-ui/core/';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Verificado from '@material-ui/icons/CheckCircleOutline';
import ImageGallery from 'react-image-gallery';
import Estrellas from '../Estrellas.js';
import ReportarPublicacion from './ReportarPublicacion.js'
import Estilos from '../Estilos.js';

import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function PublicacionInfo({esDePerfil, datosPagina}) {
  const classes = Estilos();
  const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
  
  const [imagenes, setimagenes] = useState([])

  const [DatosPagina, setDatosPagina] = useState({
    titulo:"",
    precio:"",
    categoria:"",
    servicio:"",
    estrella: 0,
    descripcion:"",
    imagenes:[""]
  });

  useEffect(()=>{
  if (state.jwt!=="" || state.publico===true)
    if(datosPagina!==null){
      let img = datosPagina.imagenes.map((imagen)=>{
        return ({
          original: state.servidor+imagen.url,
          thumbnail: state.servidor+imagen.formats.thumbnail.url
        })
      })
      setimagenes(img)

      setDatosPagina({
        titulo: datosPagina.titulo,
        categoria: datosPagina.categoria,
        servicio: datosPagina.servicio,
        estrella: 0,
        descripcion: datosPagina.descripcion,
        precio_estimado: datosPagina.precio_estimado,
        tipo: datosPagina.tipo,
        pausado: datosPagina.pausado,
        imagenes: datosPagina.imagenes
      })
    }
},[datosPagina, state.jwt, state.publico])

  return (
    <div className={classes.mostrarFlex}>
      <Paper elevation={5} >
        <Grid className={classes.padding} container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={12} hidden={!esDePerfil} className={esDePerfil?classes.EstiloMovil:classes.EstiloVacio}>
              <Avatar
              alt="Remy Sharp"
              src="https://i.pinimg.com/originals/69/1d/0c/691d0c155896f8ec64280648cac6fa22.jpg"
              className={classes.imagenPublicacion} />
            </Grid>
            
            <Grid item xs={esDePerfil?10:6} sm={esDePerfil?11:7}>
                <Typography variant="h5" component="h1" align="left">
                  {DatosPagina.titulo}
                  {
                    esDePerfil && <Hidden xlDown={!DatosPagina.identidad_verificada}><Tooltip title="Usuario verificado">
                      <IconButton><Verificado color="primary"/></IconButton>
                    </Tooltip></Hidden>
                  }
                </Typography>
            </Grid>

            <Grid hidden={esDePerfil} item xs={6} sm={4} align-items="last baseline">
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Typography color="inherit">{DatosPagina.categoria}</Typography>
                <Typography color="inherit">{DatosPagina.servicio}</Typography>
              </Breadcrumbs>
            </Grid>
            
            <Grid item xs={esDePerfil?2:6} sm={1}>
              <ReportarPublicacion esDePerfil={esDePerfil}/>
            </Grid>
            <Grid item xs={6} hidden={esDePerfil}>
                <Typography variant="h6" component="h3" align="left">
                  {DatosPagina.tipo?"Precio estimado:":"Presupuesto:"} ${DatosPagina.precio_estimado}
                </Typography>
            </Grid>
            <Grid item xs={6} sm={6} hidden={esDePerfil}>
                <Typography variant="h6" component="h3">
                    <Estrellas clickeable={false} valor={DatosPagina.estrella}/>
                </Typography>
            </Grid>
            
            <Grid item xs={12}>
                <Typography variant="body1" component="p" align="justify"> 
                  {DatosPagina.descripcion}    
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ImageGallery items={imagenes}/>
            </Grid>
            
        </Grid>
      </Paper>

    </div>
  );
}
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

export default function PublicacionInfo({esDePerfil, datosPerfil}) {
  const classes = Estilos();
  const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
  //const [datosPerfil, setdatosPerfil] = useState({})

  const [imagenes, setimagenes] = useState([])

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
    if(esDePerfil && datosPerfil!=null){
      console.log("publicacion datos perfil:",datosPerfil)
      
      let img = datosPerfil.imagenes_proveedor.map((imagen)=>{
        return ({
          original: state.servidor+imagen.url,
          thumbnail: state.servidor+imagen.formats.thumbnail.url
        })
      })
      console.log("Img:",img)

      setimagenes(img)

      setDatosPagina({
        titulo: `${datosPerfil.nombre} ${datosPerfil.apellido}`,
        precio:"",
        categoria:"",
        servicio:"",
        estrella: 0,
        descripcion: datosPerfil.descripcion,
        imagenes:[]
      })
    }else{
      setDatosPagina({
        titulo:"Reparación de caños",
        precio:"300",
        categoria:"Plomería",
        servicio:"Caños",
        estrella: 3.5,
        descripcion:"Se reparan caños a domicilio.",
        imagenes:[]
      })
    }
},[datosPerfil])

  return (
    <div className={classes.mostrarFlex}>
      <Paper elevation={5} >
        <Grid className={classes.padding} container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={12} hidden={!esDePerfil} className={esDePerfil && classes.EstiloMovil}>
              <Avatar
              alt="Remy Sharp"
              src="https://i.pinimg.com/originals/69/1d/0c/691d0c155896f8ec64280648cac6fa22.jpg"
              className={classes.imagenPublicacion} />
            </Grid>
            
            <Grid item xs={esDePerfil?10:6} sm={esDePerfil?11:7}>
                <Typography variant="h5" component="h1" align="left">
                  {datosPagina.titulo}
                  {
                    esDePerfil && <Hidden xlDown={!datosPerfil.identidad_verificada}><Tooltip title="Usuario verificado">
                      <IconButton><Verificado color="primary"/></IconButton>
                    </Tooltip></Hidden>
                  }
                  
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
                    <Estrellas clickeable={false} valor={datosPagina.estrella}/>
                </Typography>
            </Grid>
            
            <Grid item xs={12}>
                <Typography variant="body1" component="p" align="justify"> 
                  {datosPagina.descripcion}    
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
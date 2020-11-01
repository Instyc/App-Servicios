import React,{useState, useEffect, useContext} from 'react';
//Material-UI
import {Card, Hidden, Typography, Chip, Button, Grid, Tooltip, IconButton} from '@material-ui/core/';
import Editar from '@material-ui/icons/Edit';
import Pausa from '@material-ui/icons/Pause';
import Eliminar from '@material-ui/icons/DeleteForever';
import Alerta from '@material-ui/lab/Alert';
import Verificado from '@material-ui/icons/CheckCircleOutline';

import Estrellas from '../Estrellas.js';
import Estilos from '../Estilos';
import {BotonContratar} from '../ContactarProveedor.js'

import {Link} from "react-router-dom";
import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function FilaPublicacion({tipoPublicacion, datos, contactar}) {
  const classes = Estilos();
  const [precioPresupuesto, setPrecioPresupuesto] = useState("");
  const [noMostrar, setnoMostrar] = useState(true);
  const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
  const [datosPagina, setdatosPagina] = useState({
    id: null,
    titulo: "",
    descripcion: "",
    precio_estimado: 0,
    imagenes: [],
    servicio: "",
    estrellas:0,
    Usuario_id: {nombre:"", apellido: ""},
    Servicio_id: {nombre:""},
    pausado: false
  });
  

  useEffect(()=>{
    //Dependiendo de si se quiere crear una publicación o solicitar un servicio, se muestra la pantalla correspodiente
    if(tipoPublicacion){
      setPrecioPresupuesto("Precio estimado");
    }else{
      setPrecioPresupuesto("Presupuesto");
    }
    console.log(datos)
  },[])

  useEffect(()=>{
    if(datos){
      setdatosPagina(datos)
    }
    let x = datos.Usuario_id.id===state.datosSesion.id
    setnoMostrar(!x)
  },[datos])


  return (
    <Card className={classes.filaPublicacion}>
      <Grid container spacing={1} justify="center">
          {
            datosPagina.pausado && (<Alerta className={classes.inputAncho} style={{marginBottom:"10px"}} variant="outlined" severity="warning">
              Esta publicación se encuentra pausada.
            </Alerta>)
          }
          <Grid container spacing={1} justify="center" alignItems="center">
            <Grid item xs={12} md={3} sm={12} align="center">
              <img 
                className={classes.imagenPublicacion}
                src={datosPagina.imagenes.length!==0?state.servidor+datosPagina.imagenes[0].url:"https://i.pinimg.com/564x/2f/2e/26/2f2e2667a7116678f0e59abce4911482.jpg"}
                alt="1° imagen"
              />
            </Grid>
            <Grid item xs={12} md={9} sm={12}>  
              <Typography align="left" component="h5" variant="h5">
                {`${datosPagina.Usuario_id.nombre} ${datosPagina.Usuario_id.apellido}`}
                <Hidden xlDown={!datosPagina.Usuario_id.identidad_verificada}><Tooltip title="Usuario verificado">
                  <IconButton style={{padding: 1}}><Verificado color="primary"/></IconButton>
                </Tooltip></Hidden>
              </Typography>

              <Typography align="left" component="h5" variant="h5">
                  {datosPagina.titulo}
                <Hidden xlDown={noMostrar}>  
                  <Link to={tipoPublicacion?"/modificar-publicacion/"+datosPagina.id:"/modificar-solicitud-servicio/"+datosPagina.id}>
                    <Tooltip title="Editar publicación">
                      <IconButton><Editar color="primary" /></IconButton>
                    </Tooltip>
                  </Link>
                  <Tooltip title="Pausar publicación">
                    <IconButton><Pausa color="primary" /></IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar publicación">
                    <IconButton><Eliminar color="secondary" /></IconButton>
                  </Tooltip>
                </Hidden>  
              </Typography>
              <div style={{overflow: "auto", textOverflow: "ellipsis", textJustify:"auto"}}> 
                <Typography>
                  {datosPagina.descripcion}
                </Typography>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={8} sm={12} md={6} lg={3} align="center">
            <Typography component="h6" variant="h6" color="secondary">
              {precioPresupuesto}: {datosPagina.precio_estimado}
            </Typography>
          </Grid>  

          {
            (tipoPublicacion && datosPagina.Servicio_id!==null) && (<Grid item xs={4} sm={6} md={6} lg={3} align="center">
            <Chip variant="outlined" label={datosPagina.Servicio_id.nombre}/>
          </Grid>)
          }

          <Grid item xs={12} sm={6} md={6} lg={3} align="center">
            <Estrellas valor={datos.estrellas} clickeable={false} cambiarValor={()=>{}}/>
          </Grid>
          
          <Grid item xs={6} sm={6} md={6} lg={3} align="center" hidden={!contactar}>
            <BotonContratar/>
          </Grid>
           
        <Grid item xs={6} lg={12} md={12} sm={6} align="center">
          <Link to={"/publicacion/"+datosPagina.id} style={{textDecoration:"none", padding: 0, color:"black"}}>
            <Button variant="outlined" color="primary">Leer más</Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
}







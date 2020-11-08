import React,{useState, useEffect, useContext} from 'react';
import axios from 'axios'
//Material-UI
import {Card, Hidden, Typography, Chip, Button, Grid, Tooltip, IconButton} from '@material-ui/core/';
import Editar from '@material-ui/icons/Edit';
import Pausa from '@material-ui/icons/Pause';
import Despausar from '@material-ui/icons/PlayArrow';
import Eliminar from '@material-ui/icons/DeleteForever';
import Alerta from '@material-ui/lab/Alert';
import Verificado from '@material-ui/icons/CheckCircleOutline';
import AlertaSi_No from '../AlertaSi_No.js';

import Estrellas from '../Estrellas.js';
import Estilos from '../Estilos';
import {BotonContratar} from '../ContactarProveedor.js'

import {Link} from "react-router-dom";
import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'
import { FormatListBulletedRounded } from '@material-ui/icons';

export default function FilaPublicacion({tipoPublicacion, datos, contactar, buscarSolicitudes, resenas}) {
  const classes = Estilos();
  const [precioPresupuesto, setPrecioPresupuesto] = useState("");
  const [noMostrar, setnoMostrar] = useState(true);
  const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
  const [preguntarPausa, setpreguntarPausa] = useState(false);
  const [preguntarEliminar, setpreguntarEliminar] = useState(false);
  const [promedio, setpromedio] = useState(0);

  const [datosPagina, setdatosPagina] = useState({
    id: null,
    titulo: "",
    descripcion: "",
    precio_estimado: 0,
    imagenes: [],
    servicio: "",
    estrellas:0,
    Usuario_id: {id: null, nombre:"", apellido: ""},
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
  },[])

  useEffect(()=>{
    if(datos.Usuario_id!==null){
      setdatosPagina(datos)
      let x = datos.Usuario_id.id===state.datosSesion.id
      setnoMostrar(!x)
    }
  },[datos])

  useEffect(()=>{
    if(resenas!==null && resenas!==undefined ){
      
      let total = 0, i = 0
      resenas.resenas.map((resena)=>{
        if(resena.proveedor.id===datos.Usuario_id.id){
          total+=resena.recomendacion
          i++
        }
      })
      setpromedio(total/i)
    }
  },[resenas])


  const eliminarPublicacion = (boole) =>{
    let auth = 'Bearer '+state.jwt;
    if(boole){
      axios.delete(
        state.servidor+"/api/solicitud/"+datosPagina.id,{
          headers: {'Authorization': auth},
        }
        )
        .then(response => {
          console.log("Respuesta eliminar: ",response.data)
          buscarSolicitudes()
        })
        .catch(error => {
          console.log("Error, no se ha podido eliminar la publicación.", error.response)
        })
      }
    setpreguntarEliminar(false)
  } 
  
  const pausarPublicacion = (boole) =>{
    let auth = 'Bearer '+state.jwt;
    if(boole){
      let Pausa = !datosPagina.pausado
      axios.put(
      state.servidor+"/api/solicitud/"+datosPagina.id,{
        pausado: Pausa
      },{
        headers: {'Authorization': auth},
      })
      .then(response => {
        console.log("Respuesta pausa: ",response.data)
      })
      .catch(error => {
        console.log("Error, no se ha podido pausar la publicación.", error.response)
      })
      setdatosPagina(prevState => ({
        ...prevState,
        pausado: Pausa
      }))
    }
    setpreguntarPausa(false)
  }

  return (
    <Card className={classes.filaPublicacion}>
      <Grid container spacing={1} justify="center">
          {
            datosPagina.pausado && (<Alerta className={classes.inputAncho} style={{marginBottom:"10px"}} variant="outlined" severity="warning">
              Esta publicación se encuentra pausada.
            </Alerta>)
          }
          {
            datosPagina.bloqueado && (<Alerta className={classes.inputAncho} style={{marginBottom:"10px"}} variant="outlined" severity="error">
              Esta publicación se encuentra bloqueada, contacte a un administrador.
            </Alerta>)
          }
          <Grid container spacing={1} justify="center" alignItems="center">
            <Grid item xs={12} md={3} sm={12} align="center">
              <img 
                className={classes.imagenPublicacion}
                src={datosPagina.imagenes.length!==0?state.servidor+datosPagina.imagenes[0].url:state.imagen_predeterminada}
                alt="1° imagen"
              />
            </Grid>
            <Grid item xs={12} md={9} sm={12}>  
              <Typography align="left" component="h5" variant="h5">
                {`${datosPagina.Usuario_id.nombre} ${datosPagina.Usuario_id.apellido}`}
                <Hidden xlDown={!datosPagina.Usuario_id.identidad_verificada}><Tooltip title="Usuario verificado">
                  <IconButton style={{padding: 1}}><Verificado color="inherit"/></IconButton>
                </Tooltip></Hidden>
              </Typography>

              <Typography align="left" component="h5" variant="h5">
                  {datosPagina.titulo}
                <Hidden xlDown={noMostrar}>  
                  <Link to={tipoPublicacion?"/modificar-publicacion/"+datosPagina.id:"/modificar-solicitud-servicio/"+datosPagina.id}>
                  <Tooltip title="Editar publicación">
                    <IconButton ><Editar color="primary" /></IconButton>
                  </Tooltip>
                  </Link>
                  <Tooltip title="Pausar publicación">
                    <IconButton onClick={()=>{setpreguntarPausa(true)}}>{datosPagina.pausado?<Despausar color="primary" />:<Pausa color="primary" />}</IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar publicación">
                    <IconButton onClick={()=>{setpreguntarEliminar(true)}}><Eliminar color="secondary" /></IconButton>
                  </Tooltip>
                  {
                    preguntarPausa &&
                    <AlertaSi_No
                    mensaje={datosPagina.pausado?
                    'La publicación "'+datosPagina.titulo+'" volverá a aparecer en la sección de búsqueda.'
                    :'La publicación "'+datosPagina.titulo+'" será pausada y no se mostrará en la sección de búsqueda.'}
                    funcionAceptar={pausarPublicacion}
                    titulo={datosPagina.pausado?
                    "¿Está seguro que quiere despausar la publicación?"
                    :"¿Está seguro que quiere pausar la publicación?"}/> 
                  }
                  {
                    preguntarEliminar &&
                    <AlertaSi_No
                    mensaje={'Se va a eliminar la publicación "'+datosPagina.titulo+'", esta acción no se puede revertir.'}
                    funcionAceptar={eliminarPublicacion}
                    titulo="¿Está seguro que quiere eliminar la publicación?"/>
                  }
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
            <Typography component="h6" variant="h6">
              {precioPresupuesto}: ${datosPagina.precio_estimado}
            </Typography>
          </Grid>  

          {
            (tipoPublicacion && datosPagina.Servicio_id!==null) && (<Grid item xs={4} sm={6} md={6} lg={3} align="center">
            <Chip variant="outlined" label={datosPagina.Servicio_id.nombre}/>
          </Grid>)
          }

          {
            tipoPublicacion &&
            <Grid item xs={12} sm={6} md={6} lg={3} align="center">
              <Estrellas valor={promedio} clickeable={false} cambiarValor={()=>{}}/>
            </Grid>
          }
          
          {
            datosPagina.Usuario_id.id!==state.datosSesion.id &&
            <Grid item xs={6} sm={6} md={6} lg={3} align="center" hidden={!contactar}>
              <BotonContratar
              fijo={false}
              esDePerfil={false}
              datos={{idS: datosPagina.id, idP: datosPagina.Usuario_id.id, nombre: `${datosPagina.Usuario_id.nombre} ${datosPagina.Usuario_id.apellido}`}}/>
            </Grid>
          }
           
        <Grid item xs={6} lg={12} md={12} sm={6} align="center">
          <Link to={"/publicacion/"+datosPagina.id} style={{textDecoration:"none", padding: 0, color:"black"}}>
            <Button variant="outlined" color="default">Leer más</Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
}







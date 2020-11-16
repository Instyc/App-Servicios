import React,{useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";

import axios from 'axios'
//Material-UI
import {Card, Hidden, Typography, Chip, Button, Grid, Tooltip, IconButton, Container } from '@material-ui/core/';
import Editar from '@material-ui/icons/Edit';
import Pausa from '@material-ui/icons/Pause';
import Despausar from '@material-ui/icons/PlayArrow';
import Eliminar from '@material-ui/icons/DeleteForever';
import Alerta from '@material-ui/lab/Alert';
import Verificado from '@material-ui/icons/CheckCircleOutline';
import AlertaSi_No from '../AlertaSi_No.js';

//Componentes
import Estrellas from '../Estrellas.js';
import Estilos from '../Estilos';
import {BotonContratar} from '../ContactarProveedor.js'

//Estados globales que utilizaremos en este componente
import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'
import { FormatListBulletedRounded } from '@material-ui/icons';

//Esto es un subcomponente que se utiliza en componente Categoria.js, permite dar un breve resumen de la publicación en cuestión
//informando así el titulo, descripcion, precio estimado, valoración, una imagen y el tipo de servicio.
//Permite tambien ver a la dicha publicación o contactar directamente al proveedor de la publicación
//El componente recibe un conjunto de parámetros que son derivados del supercomponente que lo utiliza
export default function FilaPublicacion({tipoPublicacion, datos, contactar, buscarSolicitudes, resenas}) {
  const classes = Estilos();
  const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
  //Variables para el manejo del componente
  const [precioPresupuesto, setPrecioPresupuesto] = useState("");
  const [noMostrar, setnoMostrar] = useState(true);
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
    tipo: false,
    Usuario_id: {id: null, nombre:"", apellido: "", imagen_perfil:null},
    Servicio_id: {nombre:""},
    pausado: false
  });

  //Funcion que se ejecuta por única vez cuando el componente se renderiza.
  useEffect(()=>{
    //Dependiendo de si se quiere crear una publicación o solicitar un servicio, se muestra la pantalla correspodiente
    if(tipoPublicacion){
      setPrecioPresupuesto("Precio estimado");
    }else{
      setPrecioPresupuesto("Presupuesto");
    }
  },[])

  //Cuando la variable datos cambia, es decir, cuando el supercomponente cambia el valor de la variable, el siguiente
  //método se va a ejecutar, éste lo que hace setear una variable para mostrar u ocultar los botones para editar
  //borrar o pausar una determinada publicación
  useEffect(()=>{
    if(datos.Usuario_id!==null){
      setdatosPagina(datos)
      let x = datos.Usuario_id.id===state.datosSesion.id
      setnoMostrar(!x)
    }
  },[datos])

  //Funcion que se ejecuta cuando la variable resenas cambia, permite calcular el promedio de las reseñas de la publicación
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


  //Cuando se aprieta el boton eliminar publicación se ejecuta este método, lo que hace es eliminar la publicación
  //seleccionada de la base de datos
  const eliminarPublicacion = (boole) =>{
    let auth = 'Bearer '+state.jwt;
    if(boole){
      //Si boole es true, entonce significa que se ha puesto "Aceptar" en el dialogo emergente, por consecuente se envia la orden de eliminar la publicación
      axios.delete(
        state.servidor+"/api/solicitud/"+datosPagina.id,{
          headers: {'Authorization': auth},
        }
        )
        .then(response => {
          buscarSolicitudes()
        })
        .catch(error => {
          console.log("Error, no se ha podido eliminar la publicación.", error.response)
        })
      }
    setpreguntarEliminar(false)
  } 

  //Cuando se aprieta el boton eliminar publicación se ejecuta este método, lo que hace es pausar la publicación seleccionada
  const pausarPublicacion = (boole) =>{
    let auth = 'Bearer '+state.jwt;
    if(boole){
      //Si boole es true, entonce significa que se ha puesto "Aceptar" en el dialogo emergente, por consecuente se envia la orden de pausar la publicación

      let Pausa = !datosPagina.pausado
      axios.put(
      state.servidor+"/api/solicitud/"+datosPagina.id,{
        pausado: Pausa
      },{
        headers: {'Authorization': auth},
      })
      .then(response => {
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

  //Si la publicación lleva mas de 10 dias sin modificarse, se considera como vencida (esto para evitar que ciertas
  //publicaciones se muestren para siempre, en el caso de que el usuario deje de visitar a Servia)
  function publicacionVencida(){
    let hoy = Date.now()
    let modificado = new Date(datosPagina.updated_at)
    //Calculamos la cantidad de dias que lleva la publicación sin editarse
    let dias = parseInt((hoy-modificado)/1000/60/60/24)

    //Segun el tipo de publicación el tiempo de vencimiento es mayor o menor. Si es una solicitud 15 dias, sino 30
    let diasTipo = datosPagina.tipo?30:15
    if(dias > diasTipo){
      return (<Alerta className={classes.inputAncho} style={{marginBottom:"10px"}} variant="outlined" severity="info">
        Esta publicación se encuentra vencida, por lo tanto no aparecerá en las búsquedas. Para que vuelva a aparecer su creador debe editarla.
        Tenga en cuenta que las solicitudes se vencen al cabo de 15 días y las publicaciones de proveedores a los 30 días.
        --Si usted quiere contactar a este proveedor/cliente, tenga en cuenta que es posible que no le responda o no le responda a  tiempo, ya que puede estar inactivo en Servia.--
      </Alerta>)
    }
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
          {
            publicacionVencida()
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
                  <Link to={tipoPublicacion?state.ruta+"/modificar-publicacion/"+datosPagina.id:state.ruta+"/modificar-solicitud-servicio/"+datosPagina.id}>
                  <Tooltip title="Editar publicación">
                    <IconButton ><Editar color="primary" /></IconButton>
                  </Tooltip>
                  </Link>
                  <Tooltip title="Pausar publicación">
                    <IconButton onClick={()=>{setpreguntarPausa(true)}}>{datosPagina.pausado?<Despausar color="secondary" />:<Pausa color="primary" />}</IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar publicación">
                    <IconButton onClick={()=>{setpreguntarEliminar(true)}}><Eliminar color="error" /></IconButton>
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
              <div style={{overflow: "auto", textOverflow: "ellipsis", textJustify:"auto", align:"left", WebkitLineClamp:"3", height:"3"}}> 
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
            (datosPagina.tipo?true:state.datosSesion.tipo!==1) &&
            <Grid item xs={6} sm={6} md={6} lg={3} align="center" hidden={!contactar}>
              <BotonContratar
              fijo={false}
              esDePerfil={false}
              datos=
              {{idS: datosPagina.id,
              idP: datosPagina.Usuario_id.id,
              nombre: `${datosPagina.Usuario_id.nombre} ${datosPagina.Usuario_id.apellido}`,
              imagen_perfil: datosPagina.Usuario_id.imagen_perfil===null?null:state.servidor+datosPagina.Usuario_id.imagen_perfil.url}}/>
            </Grid>
          }
           
        <Grid item xs={6} lg={12} md={12} sm={6} align="center">
          <Link to={state.ruta+"/publicacion/"+datosPagina.id} style={{textDecoration:"none", padding: 0, color:"black"}}>
            <Button variant="outlined" color="default">Leer más</Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
}







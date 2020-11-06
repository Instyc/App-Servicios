import React,{useState, useEffect, useContext} from 'react';
import axios from 'axios'

//Material UI
import {LinearProgress, Avatar, Link, Divider, Button, Grid, Backdrop, Modal, Fade, Typography, TextField, FormControl, Hidden } from '@material-ui/core/';

//Componentes
import Estrellas from '../Estrellas.js';
import AlertaMensaje from '../AlertaMensaje.js';
import Estilos from '../Estilos.js'
import SeleccionarServicio from '../SeleccionarServicio.js';
import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'
export default function RealizarOpinion({eliminarNotificacion, datos}) {
  const classes = Estilos();
  const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
  const [open, setOpen] = React.useState(false);
  const [abrir, setabrir] = React.useState(false);
  const [valorEstrella, setValorEstrella] = useState(0);
  const [titulo, settitulo] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [servicios, setservicios] = useState([]);
  const [serviciosSeleccionados, setserviciosSeleccionados] = useState([]);
  const [cargando, setcargando] = useState(false);
  const [mensaje, setmensaje] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cambiarValor = (e) =>{
    setValorEstrella(Number(e.target.value));
  }

  useEffect(() => {
    let _id = datos.solicitud!==null?datos.solicitud.Categoria_id:Number(datos.datos_notificacion.split("_")[0])
    let auth = 'Bearer '+state.jwt;
    
    let seleccInic = datos.solicitud!==null?[datos.solicitud.Servicio_id]:[]
    setserviciosSeleccionados(seleccInic)
    
    axios.get(state.servidor+"/api/servicios?categoria="+_id,{
      headers: {'Authorization': auth},
    })
    .then(response => {
      let servicios_ = response.data.map(serv=>{
        serv["seleccionado"] = false
        return serv
      })
      console.log("Servicios",servicios_)

      setservicios(servicios_)
    })
    .catch(error => {
      alert("Un error ha ocurrido al buscar los servicios.")
      console.log(error.response)
    }) 
  },[datos])


  function enviarOpinion(e){
    e.preventDefault()
    let auth = 'Bearer '+state.jwt;
    console.log(serviciosSeleccionados)
    
    if(serviciosSeleccionados.length!==0){
      setcargando(true)
      axios.post(
        state.servidor+"/api/resenas/",{
        titulo: titulo,
        descripcion: descripcion,
        recomendacion: Number(valorEstrella),
        votos_positivos: 0,
        votos_negativos: 0,
        proveedor: datos.emisor.id,
        servicios: serviciosSeleccionados.length!==0?serviciosSeleccionados:null,
        },
        {headers: {'Authorization': auth},})
      .then(response => {
        console.log("Se ha podido crear la reseña: ",response.data)
        eliminarNotificacion(datos.id)
        setcargando(false)
        setabrir(true)
        setOpen(false)
    })
      .catch(error => {
        console.log("Error, no se ha podido crear la reseña.", error.response)
        alert("Error, no se ha podido crear la reseña.")
    })
    }else{
      setmensaje(true)
    }
  }

  function seleccionarServicio(servicio_){
    if (mensaje)
      setmensaje(false)
    let yaEsta = serviciosSeleccionados.some(serv=>(serv === servicio_.id))
    if(!yaEsta){
      setserviciosSeleccionados([...serviciosSeleccionados, servicio_.id])
    }else{
      setserviciosSeleccionados(serviciosSeleccionados.filter(srv_ => srv_!==servicio_.id))
    }
  }

  return (
    <div>
        <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
        >
        Realizar reseña
      </Button>

      <AlertaMensaje mensaje="¡Reseña enviada!" setabrir={setabrir} abrir={abrir}/>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.mostrarFlex}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        
      >
        <Fade in={open}>
          <div >
            <Grid className={classes.papelFondo} style={{maxWidth: "500px"}} container direction="row" justify="space-between" alignItems="center">
              <form onSubmit={enviarOpinion}>
                <FormControl >
                  <Grid item xs={12}>
                    <div align="center">
                        <Avatar
                        alt="Nombre proveedor"
                        src={datos.emisor.imagenes_proveedor.length!==0?state.servidor+datos.emisor.imagenes_proveedor[0].url:""}
                        className={classes.imagenPublicacion}/>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2" align="center" className={classes.form}>
                      {`${datos.emisor.nombre} ${datos.emisor.apellido}`}
                    </Typography>
                  </Grid>

                    <Typography variant="h5" component="h3" align="center" className={classes.form}>
                      {datos.solicitud!==null?"Publicación: ":"Categoría: "} 
                      {datos.solicitud!==null?datos.solicitud.titulo:datos.datos_notificacion.split("_")[1]}
                    </Typography>

                    <TextField
                      onChange={(e)=>{settitulo(e.target.value)}}
                      className={classes.inputAncho}
                      id="filled-basic"
                      label="Título de la reseña"
                      variant="filled"
                      required/>
                    <Divider/>
                    <br/>
                    <TextField
                      onChange={(e)=>{setdescripcion(e.target.value)}}
                      className={classes.inputAncho}
                      id="filled-basic"
                      label="Descripción (opcional)"
                      variant="filled"
                      multiline/>
                    <br/>

                    <Grid container spacing={2} justify="space-around">
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" component="h4" align="center" className={classes.form}>
                          {datos.solicitud!==null?"Si el proveedor te ha ofrecido otros servicios, puedes seleccionarlos aquí: ":"Selecciona los servicios llevados a cabo: "} 
                        </Typography>
                      </Grid>
                      {
                        servicios.map((servicio,k) => (
                          datos.solicitud!==null?(datos.solicitud.Servicio_id!==servicio.id):true &&
                          <Grid item xs={6} sm={4} md={3} lg={2} key={k}>
                            <SeleccionarServicio
                              servicio={servicio} 
                              agregarSeleccionado={(valor)=>{
                                seleccionarServicio(servicio)
                                servicio.seleccionado = valor
                              }}
                            />
                          </Grid>
                        ))
                      }
                    </Grid>

                    <Typography variant="h5" component="h4" align="center" className={classes.form}>
                        ¡Valora el servicio brindado!
                    </Typography>
                    <Estrellas valor={valorEstrella} cambiarValor={cambiarValor} clickeable={true}/>

                    <Hidden xlDown={!mensaje || cargando}>
                      <Typography color="error">
                        Debes seleccionar al menos un servicio.
                      </Typography>
                    </Hidden>
                    
                    {cargando && <LinearProgress/>}

                    <Button
                      type="submit"
                      disabled={Number(valorEstrella)===0 || cargando}
                      variant="contained"
                      color="primary"
                    >
                      Enviar reseña
                    </Button>
                </FormControl>
                </form>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
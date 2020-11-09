import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'

//Material UI
import {LinearProgress, Tooltip, FormGroup, FormControlLabel, Checkbox, Modal, Backdrop, Fade, Typography, TextField, Button, Hidden} from '@material-ui/core/';
import Reportar from '@material-ui/icons/PriorityHigh';
import Estilos from '../Estilos.js';
import AlertaMensaje from '../AlertaMensaje.js';

import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function ReportarPublicacion({esDePerfil, solicitud, abrirAlerta}) {
  const classes = Estilos();
  const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
  const [open, setOpen] = useState(false);
  const [motivos, setmotivos] = useState([{id: null, nombre: "",tipo: false}])
  const [motivosSeleccionados, setmotivosSeleccionados] = useState([])
  const [descripcion, setdescripcion] = useState("")
  const [abrir, setabrir] = useState(false)
  const [cargando, setcargando] = useState(false)
  const [mensaje, setmensaje] = useState(false);
  const [reporteAnterior, setreporteAnterior] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setmotivosSeleccionados([])
    setOpen(false);
  };

  function seleccionarMotivo(Motivo){
    if(mensaje===true)
      setmensaje(false)
    let esta = motivosSeleccionados.some((motivo) => motivo.id===Motivo.id)
    if(!esta){
      setmotivosSeleccionados((arreglo)=>[...arreglo, {id:Motivo.id, nombre:Motivo.nombre}])
    }else{
      setmotivosSeleccionados(motivosSeleccionados.filter((motivo)=>motivo.id!==Motivo.id))
    }
  }

  useEffect(()=>{
    if(state.jwt!=="" || state.publico===true){
      axios.get(state.servidor+"/api/motivos?tipo="+esDePerfil)
      .then(response => {
        setmotivos(response.data)
      })
      .catch(error => {
      alert("Un error ha ocurrido al cargar las motivos.")
        console.log(error.response)
      })      
    }
  },[state.jwt, state.publico])

  useEffect(() => {
    console.log(solicitud)
  }, [solicitud])

  function ComprobarReporte(reporte){
    let auth = 'Bearer '+state.jwt;

    if(motivosSeleccionados.length!==0){
      if(reporte.length!==0){
        let fecha = new Date()
        let reporte_conjunto = reporte[0]

        reporte_conjunto.descripcion+="##Nuevo reporte (Motivos:"+
        motivosSeleccionados.map(motivo=>(" "+motivo.nombre))+") del día "
        +fecha.getDate()+"/"+fecha.getMonth()+"/"+fecha.getFullYear()+":\n"+descripcion
        
        axios.put(state.servidor+"/api/reportes/"+reporte_conjunto.id,{
          descripcion: reporte_conjunto.descripcion
        },
          {headers: {'Authorization': auth},
        })
        .then(response => {
          console.log("Se modifica el reporte",response.data)
          setmensaje(false)
          handleClose()
          setabrir(true)
          setcargando(false)
          setmotivosSeleccionados([])
          setdescripcion("")
        })
        .catch(error => {
          alert("Un error ha ocurrido al cargar las motivos.")
          console.log(error.response)
        })
      }else{
        axios.post(state.servidor+"/api/reportes",{
          motivos: motivosSeleccionados.map(motivo_=>(motivo_.id)),
          Solicitud_id: esDePerfil?null:solicitud.id,
          Usuario_id: esDePerfil?solicitud.id:solicitud.Usuario_id.id,
          accion: false,
          estado: 0,
          descripcion: descripcion.length!==0?descripcion:"El usuario no ha proporcionado información adicional."
        },{
          headers: {'Authorization': auth},
        })
        .then(response => {
          console.log(response.data)
          setmensaje(false)
          handleClose()
          setabrir(true)
          setcargando(false)
          setmotivosSeleccionados([])
          setdescripcion("")
        })
        .catch(error => {
          alert("Un error ha ocurrido al cargar las motivos.")
          console.log(error.response)
        })
      }
    }else{
      setcargando(false)
      setmensaje(true)
    }
  }

  function EnviarReporte(){
    setcargando(true)
    let auth = 'Bearer '+state.jwt;
    console.log(solicitud)
    if(!esDePerfil && solicitud.id!==null){
      axios.get(state.servidor+"/api/reportes?Solicitud_id="+solicitud.id+"&estado=0"
        ,{headers: {'Authorization': auth},
      })
      .then(response => {
        console.log(response.data)
        ComprobarReporte(response.data)
      })
      .catch(error => {
        alert("Un error ha ocurrido al cargar las motivos.")
        console.log(error.response)
      })
    }
    
    if(esDePerfil && solicitud.id!==null){
      axios.get(state.servidor+"/api/reportes?Usuario_id="+solicitud.id+"&estado=0"
        ,{headers: {'Authorization': auth},
      })
      .then(response => {
        console.log(response.data)
        ComprobarReporte(response.data)
      })
      .catch(error => {
        alert("Un error ha ocurrido al cargar las motivos.")
        console.log(error.response)
      })
    }
  }


  return (
    <div>
      {abrir && <AlertaMensaje mensaje="¡Se ha enviado su reporte correctamente!" abrir={abrir} setabrir={setabrir}/>}
      <Tooltip title={esDePerfil?"Reportar proveedor de servicios":"Reportar publicación"}>
        <Button
            onClick={handleOpen}
        ><Reportar/>
        </Button>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.mostrarFlex}
        open={open}
        onClose={handleClose}
        closeAfterTransition={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.papelFondo}>
            <Typography variant="h5" component="h2" align="center">
                Seleccione los motivos:
            </Typography>
            <FormGroup required>
            {
              motivos.map((motivo,i)=>(
                <FormControlLabel
                  key={i}
                  control={
                  <Checkbox
                    variant="error"
                    onChange={()=>{seleccionarMotivo(motivo)}}
                  />
                  }
                  label={motivo.nombre}
                />
              ))
            }
            </FormGroup>

            <Hidden xlDown={!mensaje || cargando}>
              <Typography color="error">
                Debe seleccionar un motivo.
              </Typography>
            </Hidden>

            <TextField className={classes.inputAncho} onChange={(e)=>{setdescripcion(e.target.value)}} value={descripcion} id="filled-basic" label="Informacion adicional" variant="filled" multiline/>
            <br/>
            {cargando && <LinearProgress color="secondary"/>}
            <Button disabled={cargando} className={classes.inputAncho} style={{marginTop:10}} size="large" variant="contained" color="primary" onClick={EnviarReporte}>Enviar</Button>
            
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
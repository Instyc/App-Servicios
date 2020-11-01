import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'

//Material UI
import {CircularProgress, Tooltip, FormGroup, FormControlLabel, Checkbox, Modal, Backdrop, Fade, Typography, TextField, Button, Divider} from '@material-ui/core/';
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


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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


  function seleccionarMotivo(idMotivo){
    let esta = motivosSeleccionados.some((motivo) => motivo===idMotivo)

    if(!esta){
      setmotivosSeleccionados((arreglo)=>[...arreglo, idMotivo])
    }else{
      setmotivosSeleccionados(motivosSeleccionados.filter((motivo)=>motivo!==idMotivo))
    }
  }

  function EnviarReporte(){
    setcargando(true)
    let auth = 'Bearer '+state.jwt;

    if(motivosSeleccionados.length!==0)
      axios.post(state.servidor+"/api/reportes",{
        motivos: motivosSeleccionados,
        Solicitud_id: solicitud.id,
        Usuario_id: solicitud.Usuario_id.id,
        accion: false,
        estado: 0,
        descripcion: descripcion
      },{
        headers: {
            'Authorization': auth
        },
      })
      .then(response => {
        console.log(response.data)
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
    else
      console.log("no se hace el post de reporte")
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
            <FormGroup>
            {
              motivos.map((motivo,i)=>(
                <FormControlLabel
                  key={i}
                  control={
                  <Checkbox
                    variant="error"
                    onChange={()=>{seleccionarMotivo(motivo.id)}}
                  />
                  }
                  label={motivo.nombre}
                />
              ))
            }
            </FormGroup>

            <TextField className={classes.inputAncho} onChange={(e)=>{setdescripcion(e.target.value)}} value={descripcion} id="filled-basic" label="Informacion adicional" variant="filled" multiline/>
            {cargando && <CircularProgress color="secondary"/>}
            <Button disabled={cargando} className={classes.inputAncho} style={{marginTop:10}} size="large" variant="contained" color="primary" onClick={EnviarReporte}>Enviar</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
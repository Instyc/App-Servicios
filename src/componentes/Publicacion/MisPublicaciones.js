import React, {useState, useEffect, useContext} from 'react';
import FilaPublicacion from '../Categoria/FilaPublicacion.js';
import Estilos from '../Estilos.js';
import { Typography, Paper } from '@material-ui/core';
import Alerta from '@material-ui/lab/Alert';
import axios from 'axios'
import Cargando from '@material-ui/core/LinearProgress';

import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function MisPublicaciones({tipoPublicacion}) {
    const classes = Estilos();
    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
    const [tituloPagina, setTituloPagina] = useState("");
    const [cargando, setcargando] = useState(false)
    const [solicitudes, setsolicitudes] = useState([])

    useEffect(()=>{
      setcargando(true)
      //Dependiendo de si se quiere crear una publicación o solicitar un servicio, se muestra la pantalla correspodiente
      if(tipoPublicacion){
        setTituloPagina("Mis publicaciones");
      }else{
        setTituloPagina("Mis servicios solicitados");
      }
      if(state.jwt!=="" || state.publico===true){
        buscarSolicitudes()
      }
    },[state.jwt, state.publico, tipoPublicacion])

    function buscarSolicitudes(){
      axios.get(state.servidor+"/api/solicitud?Usuario_id="+state.datosSesion.id+"&tipo="+tipoPublicacion)
      .then(response => {
        setsolicitudes(response.data)
        setcargando(false)
      })
      .catch(error => {
        alert("Un error ha ocurrido al cargar las solicitudes.")
        console.log(error.response)
      })
  }

    return (
      <div className={classes.fondo}>
          <Paper elevation={3} style={{width:950, padding: 15}}>
              <Typography variant="h5" component="h2" align="center">{tituloPagina}</Typography>
              <br/>
              {
                //Cuando cargando es true (seteado al momento de empezar a realizar la búsqueda de las publicaciones), nos muestra el componente de carga,
                //y desaparece cuando cambia a false (seteado al finalizar la búsqueda de los datos)
                cargando && <Cargando/>}
              {
                !cargando && solicitudes.length===0 && (<Alerta variant="outlined" severity="info">
                  No tenés {tipoPublicacion?"publicaciones ":"solicitudes "}de servicios
                </Alerta>)
              }
              {
                  solicitudes.map((solicitud, i)=>(
                      <FilaPublicacion buscarSolicitudes={buscarSolicitudes} resenas={null} key={i} datos={solicitud} tipoPublicacion={tipoPublicacion} contactar={true}/>
                  ))
              }
          </Paper>
      </div>
  )
}

import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'

import Filtro from './Filtro.js';
import FilaPublicacion from './FilaPublicacion.js';
import Estilos from '../Estilos.js';
import {Typography, Paper} from '@material-ui/core/'
import Cargando from '@material-ui/core/LinearProgress';

import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function Categoria({tipoPublicacion}) {
    const classes = Estilos();
    let { id } = useParams()
    const [serviciosSeleccionados, setServiciosSeleccionados] = useState([])
    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
    const [categoria, setcategoria] = useState({nombre:""})
    const [servicios, setservicios] = useState([])
    const [solicitudes, setsolicitudes] = useState([])
    const [cargando, setcargando] = useState(false)

    useEffect(()=>{
        if(state.jwt!=="" || state.publico===true){
            axios.get(state.servidor+"/api/categorias/"+id)
            .then(response => {
                setcategoria(response.data)
                setservicios(response.data.servicios)
            })
            .catch(error => {
            alert("Un error ha ocurrido al cargar las categorías.")
            console.log(error.response)
            }) 
        }
    },[state.jwt, state.publico])

    const agregarSeleccionado = (servicio) => {
        let encontrado = serviciosSeleccionados.some((elemento) => elemento===servicio);
        
        if(!encontrado){
            setServiciosSeleccionados((arreglo)=>[...arreglo, servicio]);
        }else{
            setServiciosSeleccionados(serviciosSeleccionados.filter((elemento)=>servicio!==elemento));
        }
    }

    function buscarServicios(){
        let IDS = ""
        setcargando(true)

        serviciosSeleccionados.map((id)=>{
            if(id!==null){
                IDS+="id_in="+id+"&"
            }
        })

        let arregloSolicitudes = []
        if(IDS.length===0){
            servicios.map((servicio)=>{
                if(servicio!==null){
                    IDS+="id_in="+servicio.id+"&"
                }
            })
        }

        axios.get(state.servidor+"/api/servicios?"+IDS)
            .then(response => {
                response.data.map((servicio)=>{
                    servicio.solicitudes.map((Solicitud)=>{
                        if (tipoPublicacion === Solicitud.tipo){
                            Solicitud["nombreServicio"] = servicio.nombre
                            arregloSolicitudes.push(Solicitud)
                        }
                    })
                })
                setsolicitudes(arregloSolicitudes)
                setcargando(false)
            })
            .catch(error => {
            alert("Un error ha ocurrido al cargar las publicaciones.")
            console.log(error.response)
        })
    }

    return (
        <div className={classes.fondo}>
            <Paper elevation={3} style={{width:950, padding: 15}}>
                <Typography variant="h5" component="h2" align="center">{categoria.nombre}</Typography>
                <Filtro servicios={servicios} agregarSeleccionado={agregarSeleccionado} buscarServicios={buscarServicios}/>
                {cargando && <Cargando/>}
                {
                    solicitudes.map((solicitud, i)=>(
                        <FilaPublicacion key={i} datos={solicitud} tipoPublicacion={tipoPublicacion} contactar={true}/>
                    ))
                }
            </Paper>
        </div>
    )
}
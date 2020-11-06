import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'

import Filtro from './Filtro.js';
import FilaPublicacion from './FilaPublicacion.js';
import Estilos from '../Estilos.js';
import {Typography, Paper} from '@material-ui/core/'
import Cargando from '@material-ui/core/LinearProgress';
import Alerta from '@material-ui/lab/Alert';

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
    const [resenas_servicio, setresenas_servicio] = useState(null)

    const [inputBusqueda, setinputBusqueda] = useState("")

    useEffect(()=>{
        setcargando(true)
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
        buscarSolicitudes()
    },[state.jwt, state.publico])

    function buscarSolicitudes(){
        axios.get(state.servidor+"/api/solicitud?Categoria_id="+id+"&pausado=false&bloqueado=false&tipo="+tipoPublicacion)
        .then(response => {
            //Filtramos las publicaciones donde sus proveedores no estén pausados
            setsolicitudes(response.data.filter((solicitud)=>
            (
                solicitud.Usuario_id.estado === false && solicitud.Usuario_id.bloqueado===false))
            )
            setcargando(false)
        })
        .catch(error => {
            alert("Un error ha ocurrido al cargar las categorías.")
            console.log(error.response)
        })
    }

    const agregarSeleccionado = (servicio) => {
        let encontrado = serviciosSeleccionados.some((elemento) => elemento===servicio);
        
        if(!encontrado){
            setServiciosSeleccionados((arreglo)=>[...arreglo, servicio]);
        }else{
            setServiciosSeleccionados(serviciosSeleccionados.filter((elemento)=>servicio!==elemento));
        }
    }

    function buscarServicios(){
        let IDS = "&"
        setcargando(true)

        serviciosSeleccionados.map((id)=>{
            if(id!==null){
                IDS+="Servicio_id="+id+"&"
            }
        })

        if(IDS.length===1){
            servicios.map((servicio)=>{
                if(servicio!==null){
                    IDS+="Servicio_id="+servicio.id+"&"
                }
            })
        }

        axios.get(state.servidor+"/api/solicitud?"+IDS+"pausado=false&bloqueado=false&tipo="+tipoPublicacion+"&titulo_contains="+inputBusqueda)
        .then(response => {
        
          setsolicitudes(response.data.filter((solicitud)=>
          (
            solicitud.Usuario_id.estado === false && solicitud.Usuario_id.bloqueado===false))
          )
          setcargando(false)
        })
        .catch(error => {
            alert("Un error ha ocurrido al cargar las categorías.")
            console.log(error.response)
        })
    }

    useEffect(()=>{
        if(servicios.length!==0){
            let ids_ = ""
            servicios.map((servicio_)=>{
                ids_+="servicios="+servicio_.id+"&"
            })
            //console.log(ids_)

            
            axios.get(state.servidor+"/api/resenas?"+ids_)
            .then(response => {
                console.log(response.data)
                let servicios_resena = {}

                servicios.map((serv_=>{
                    if(!servicios_resena.hasOwnProperty(serv_.nombre)){
                        servicios_resena[serv_.nombre] = {resenas:[]}
                    }
                }))
                //console.log(servicios_resena)
                response.data.map((resena=>{
                    resena.servicios.map(serv_=>{
                        servicios_resena[serv_.nombre].resenas.push(resena)
                    })
                }))
                setresenas_servicio(servicios_resena)
            })
            .catch(error => {
                alert("Un error ha ocurrido al buscar los servicios.")
                console.log(error.response)
            })
        }
    },[servicios])

    return (
        <div className={classes.fondo}>
            <Paper elevation={3} style={{width:950, padding: 15}}>
                <Typography variant="h5" component="h2" align="center">{categoria.nombre}</Typography>
                <Filtro tipoPublicacion={tipoPublicacion} inputBusqueda={inputBusqueda} setinputBusqueda={setinputBusqueda} servicios={servicios} agregarSeleccionado={agregarSeleccionado} buscarServicios={buscarServicios}/>
                <br/>
                {cargando && <Cargando/>}
                {
                    !cargando && solicitudes.length===0 && (<Alerta variant="outlined" severity="info">
                    Lo sentimos, por el momento no hay {tipoPublicacion?"publicaciones ":"solicitudes "} de servicios que coincidan con los filtros de búsqueda.
                    </Alerta>)
                }
                {
                    solicitudes.map((solicitud, i)=>(
                        <FilaPublicacion
                        key={i}
                        resenas={solicitud.tipo?(resenas_servicio===null?null:resenas_servicio[solicitud.Servicio_id.nombre]):null}
                        buscarSolicitudes={buscarSolicitudes}
                        datos={solicitud}
                        tipoPublicacion={tipoPublicacion}
                        contactar={true}/>
                    ))
                }
            </Paper>
        </div>
    )
}
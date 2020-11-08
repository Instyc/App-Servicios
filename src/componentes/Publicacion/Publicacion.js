import React, {useEffect, useState, useContext} from 'react';

//Material-UI
import {Grid} from '@material-ui/core/';
import {useParams} from 'react-router-dom'
import axios from 'axios'
//Componentes
import ProveedorInfo from './ProveedorInfo.js';
import PublicacionInfo from './PublicacionInfo.js';
import Opiniones from './Opiniones.js';
import Estilos from '../Estilos.js';
import {BotonContratar} from '../ContactarProveedor.js'
import {Container} from '@material-ui/core/';

import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function Publicacion() {
    const classes = Estilos();
    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
    let { id } = useParams();
    const [datosPerfil, setdatosPerfil] = useState({
        id: null,
        descripcion:"",
        nombre:"",
        apellido:"",
        identidad_verificada: false,
        telefono: "",
        mostrar_telefono: false,
        pausado: false,
        bloqueado: false,
        servicios: [],
        imagen_perfil: ""
    })
    const [datosPagina, setdatosPagina] = useState({
        id: null,
        descripcion:"",
        titulo:"",
        precio_estimado: 0,
        tipo: false,
        pausado: false,
        bloqueado: false,
        imagenes: [],
        Usuario_id: null
    })

    useEffect(()=>{
        if (state.jwt!=="" || state.publico===true){            
            axios.get(state.servidor+"/api/solicitud/"+id)
            .then(response => {
                obtenerUsuario(response.data)
            })
            .catch(error => {
                alert("Un error ha ocurrido al buscar la solicitud.")
                console.log(error.response)
            }) 
        }
    },[state.jwt, state.publico])

    function obtenerUsuario(data){
        setdatosPagina({
            id: data.id,
            titulo: data.titulo,
            descripcion: data.descripcion,
            precio_estimado: data.precio_estimado,
            tipo: data.tipo,
            pausado: data.pausado,
            imagenes: data.imagenes,
            categoria: data.Categoria_id.nombre,
            servicio: data.tipo?data.Servicio_id.nombre:null,
            Usuario_id: data.Usuario_id,
            bloqueado: data.bloqueado,
            servicio_id: data.tipo?data.Servicio_id.id:null,
        })

        let auth = state.jwt!==""?'Bearer '+state.jwt:"";
        
        axios.get(
            state.servidor+"/users/"+data.Usuario_id.id,{
                headers: {
                'Authorization': auth
                },
            })
            .then(response => {
                setdatosPerfil({
                    id: response.data.id,
                    descripcion: response.data.descripcion,
                    titulo: `${response.data.nombre} ${response.data.apellido}`,
                    identidad_verificada: response.data.identidad_verificada,
                    telefono: response.data.telefono,
                    mostrar_telefono: response.data.mostrar_telefono,
                    servicios: response.data.servicios,
                    bloqueado: response.data.bloqueado,
                    pausado: response.data.estado,
                    imagen_perfil: response.data.imagen_perfil===null?null:response.data.imagen_perfil.url
                })
            })
            .catch(error => {
                alert("Un error ha ocurrido al buscar el usuario.")
                console.log(error.response)
            }) 
    }

    return (
        <Container style={{width: "95%"}}>
            <Grid container direction="row" justify="center" alignItems="stretch">
                <Grid item md={8} xs={12}>
                  <PublicacionInfo esDePerfil={false} datosPagina={datosPagina}/>
                  {datosPagina.tipo && <Opiniones datos={datosPagina}/>}
                </Grid>  

                {
                    datosPagina.tipo && (
                        <Grid item md={4} xs={12} >
                            <ProveedorInfo esDePerfil={false} datosPerfil={datosPerfil}/>
                        </Grid> 
                    )
                }
                {
                    //Si no es el dueño de la publicación, y si el proveedor o la publicación no se encuentrar pausada o bloqueada, entonces ofrecemos la posibilidad de contactarlo 
                    datosPerfil.id!==state.datosSesion.id && !datosPagina.pausado && !datosPagina.bloqueado && !datosPerfil.pausado && !datosPerfil.bloqueado &&
                    <BotonContratar fijo={true} esDePerfil={false} datos={{idS: datosPagina.id, idP: datosPerfil.id, nombre: datosPerfil.titulo}} />
                }
            </Grid>
        </Container>
    )
}

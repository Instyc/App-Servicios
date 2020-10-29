import React, {useEffect, useState, useContext} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'

import Grid from '@material-ui/core/Grid';
import ProveedorInfo from '../Publicacion/ProveedorInfo.js';
import PublicacionInfo from '../Publicacion/PublicacionInfo.js';
import {BotonContratar} from '../ContactarProveedor.js'

import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado' 
export default function MiPerfil() {
    const [datosPagina, setdatosPagina] = useState({
        descripcion:"",
        titulo:"",
        identidad_verificada: false,
        telefono: "",
        mostrar_telefono: false,
        servicios: [],
        imagenes: [],
        //Datos de publicación
        precio_estimado: 0,
        pausado: false,
        tipo: false,
        categoria:"",
        servicio:"",
        estrella: 0,
    })
    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
    let { id } = useParams();
    
    useEffect(()=>{
        if (state.jwt!=="" || state.publico===true){
            let auth = state.jwt!==""?'Bearer '+state.jwt:"";
            axios.get(
            state.servidor+"/users/"+id,{
                headers: {
                'Authorization': auth
                },
            })
            .then(response => {
                setdatosPagina({
                    id: response.data.id,
                    descripcion: response.data.descripcion,
                    titulo: `${response.data.nombre} ${response.data.apellido}`,
                    identidad_verificada: response.data.identidad_verificada,
                    telefono: response.data.telefono,
                    mostrar_telefono: response.data.mostrar_telefono,
                    servicios: response.data.servicios,
                    imagenes: response.data.imagenes_proveedor
                })
                console.log(response.data)
            })
            .catch(error => {
                alert("Un error ha ocurrido al buscar el usuario.")
                console.log(error.response)
            }) 
        }
    },[state.jwt, state.publico])

    return (
        <Grid container direction="row" justify="center" alignItems="stretch">
            <Grid item md={8} xs={12} >
                <PublicacionInfo esDePerfil={true} datosPagina={datosPagina}/>
            </Grid> 
            <Grid item md={4} xs={12} >
                <ProveedorInfo esDePerfil={true} datosPerfil={datosPagina}/>
            </Grid>
            <BotonContratar fijo={true} esDePerfil={true}/> 
        </Grid>
    )
}


import React, {useEffect, useState, useContext} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'

import Grid from '@material-ui/core/Grid';
import ProveedorInfo from '../Publicacion/ProveedorInfo.js';
import PublicacionInfo from '../Publicacion/PublicacionInfo.js';
import Estilos from '../Estilos.js';
import {BotonContratar} from '../ContactarProveedor.js'

import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'
export default function MiPerfil() {
    const [datosPerfil, setdatosPerfil] = useState({
        descripcion:"",
        nombre:"",
        apellido:"",
        identidad_verificada: false,
        telefono: "",
        mostrar_telefono: false,
        servicios: [],
        imagenes_proveedor: []
    })
    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
    let { id } = useParams();
    
    useEffect(()=>{
        if (state.jwt!=="" || state.publico===true){
            //let auth = 'Bearer '+state.jwt;
            //console.log(auth)
            axios.get(
            state.servidor+"/users/"+id/*,
            {
                headers: {
                'Authorization': auth
                },
            }*/
            )
            .then(response => {
                setdatosPerfil(response.data)
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
                <PublicacionInfo esDePerfil={true} datosPerfil={datosPerfil}/>
            </Grid> 
            <Grid item md={4} xs={12} >
                <ProveedorInfo esDePerfil={true} datosPerfil={datosPerfil}/>
            </Grid>
            <BotonContratar fijo={true} esDePerfil={true} datosPerfil={datosPerfil}/> 
        </Grid>
    )
}


import React,{useState, useEffect, useContext} from 'react';

//Material UI
import {FormControl ,Typography, TextField, Button, Divider, Link, Paper, Grid, Checkbox, FormControlLabel, Hidden} from '@material-ui/core/';

//Libreria para consultar la API del servidor
import axios from 'axios';

//Componentes creados
import Estilos from '../Estilos.js';
import SubirImagen from '../SubirImagen.js';
import InicioSesion from "../Sesion/InicioSesion.js";

import { ObtenerEstadoUsuario, ProveerEstadoUsuario } from '../../Estados/UsuarioEstado'

export default function Registrar({registrar}) {
    const classes = Estilos();
    const [tituloPagina, settituloPagina] = useState("");
    const { state, dispatch } = useContext(ObtenerEstadoUsuario);
    
    const [pictures, setPictures] = useState([]);
    
    //Variables de los campos   
    const [datos, setdatos] = useState({
        nombre:"",
        apellido:"",
        correo:"",
        usuario:"",
        telefono:"",
        contrasena:"",
        contrasena_rep:"",
        dni:"",
        descripcion:""
    });

    //Proveedor
    const [soyProveedor, setSoyProveedor] = useState(true);
    
    const cambiarInput = (e) =>{
        let valor = e.target.value;
        let campo = e.target.name;
        setdatos({
            ...datos,
            [campo]: valor
        })
    }

    useEffect(()=>{
        axios
            .get("http://localhost:1337/api/servicios")
            .then(response => {
                // Se registró el usuario correctamente
                console.log('Well done!'+response.data);
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);
            })
            .catch(error => {
                // Ocurrió un error
                console.log('Ha ocurrido un error:', error.response);
        });
        axios
                .post(state.servidor+"/auth/local/register", {
                    username: 'Strapi user',
                    email: 'user@strapi.io',
                    password: 'strapiPassword',
                })
                .then(response => {
                    // Se registró el usuario correctamente
                    console.log('Well done!');
                    console.log('User profile', response.data.user);
                    console.log('User token', response.data.jwt);
                })
                .catch(error => {
                    // Ocurrió un error
                    console.log('Ha ocurrido un error:', error.response);
            });
    },[])
    const registrarUsuario = (e) =>{
        e.preventDefault();
        if(datos.contrasena!==datos.contrasena_rep){
            alert("Las contraseñas no son iguales");
        }else{
            /*axios
                .post(state.servidor+"/auth/local/register", {
                    username: 'Strapi user',
                    email: 'user@strapi.io',
                    password: 'strapiPassword',
                })
                .then(response => {
                    // Se registró el usuario correctamente
                    console.log('Well done!');
                    console.log('User profile', response.data.user);
                    console.log('User token', response.data.jwt);
                })
                .catch(error => {
                    // Ocurrió un error
                    console.log('Ha ocurrido un error:', error.response);
            });*/
            axios
                .get("https://localhost:1337/api/servicios")
                .then(response => {
                    // Se registró el usuario correctamente
                    console.log('Well done!'+response.data);
                    console.log('User profile', response.data.user);
                    console.log('User token', response.data.jwt);
                })
                .catch(error => {
                    // Ocurrió un error
                    console.log('Ha ocurrido un error:', error.response);
            });
        }
    }

    /*Cuando se renderiza la pagina debemos saber si ha sido invocada para registrar un usuario o
    para modificar datos  */
    useEffect(()=>{
        if(!registrar){
            settituloPagina("Modificar mi perfil")
        }else{
            settituloPagina("Registrar usuario")
        }
    },[])
    
    function onDrop(pictureFiles, pictureDataURLs){
        setPictures(pictureFiles);
    }
    return (
        <div className={classes.fondo}>
            <Paper elevation={3} >
                <form onSubmit={registrarUsuario}>
                    <Grid className={classes.gridRegistro} spacing={1} container justify="space-between" alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h1" align="center" className={classes.inputAncho}>
                                {tituloPagina}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                            className={classes.inputAncho}
                            name="nombre"
                            value={datos.nombre}
                            onChange={cambiarInput}
                            id="filled-basic"
                            label="Nombre"
                            variant="filled"
                            required/>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField className={classes.inputAncho} name="apellido" value={datos.apellido} onChange={cambiarInput} id="filled-basic" label="Apellido" variant="filled" required/>
                        </Grid>

                        <Grid item xs={12}>
                            <SubirImagen cantidad={1}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField className={classes.inputAncho} name="correo" value={datos.correo} onChange={cambiarInput} id="filled-basic" label="Correo electrónico" variant="filled" type="email" required />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField className={classes.inputAncho} name="usuario" value={datos.usuario} onChange={cambiarInput} id="filled-basic" label="Usuario" variant="filled" required />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField className={classes.inputAncho} name="telefono" value={datos.telefono} onChange={cambiarInput} id="filled-basic" label="Telefono" variant="filled"/>
                        </Grid>
                        <Divider/>

                        <Grid item xs={6}>
                            <TextField
                                required
                                name="contrasena"
                                value={datos.contrasena}
                                onChange={cambiarInput}
                                type="password"
                                label="Contraseña"
                                variant="filled"
                                className={classes.inputAncho} 
                            />
                        </Grid>

                        <Grid item xs={6}> 
                            <TextField
                                required
                                name="contrasena_rep"
                                value={datos.contrasena_rep}
                                onChange={cambiarInput}
                                type="password"
                                label="Repetir contraseña"
                                variant="filled"
                                className={classes.inputAncho}
                            />
                        </Grid>

                        <Hidden xlDown={datos.contrasena_rep==="" || datos.contrasena===datos.contrasena_rep}>
                            <Grid item xs={12}>
                                <Typography color="error">
                                    *Las contraseñas no coinciden.
                                </Typography>
                            </Grid>
                        </Hidden>

                        <Grid item xs={12}>
                            <OkProveedor soyProveedor={soyProveedor} setSoyProveedor={setSoyProveedor}/>
                            <div hidden={soyProveedor}>
                                <Grid container spacing={1} direction="row" alignItems="center">
                                    <Grid item xs={12} align="center">
                                        <TextField name="dni" value={datos.dni} onChange={cambiarInput} id="filled-basic" label="DNI" variant="filled"/>
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <SubirImagen cantidad={2}/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField name="descripcion" value={datos.descripcion} onChange={cambiarInput} className={classes.inputAncho} id="filled-basic" label="Descripción" variant="filled" multiline/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                            type="submit"
                            className={classes.inputAncho}
                            size="large"
                            variant="contained"
                            color="primary">
                            {registrar?"Registrar Usuario":"Guardar cambios"}
                            </Button>
                        </Grid>
                        
                        <Grid item xs={12} hidden={!registrar}>
                            <InicioSesion mensaje={"¿Ya tenés una cuenta?"}/>
                        </Grid>
                    </Grid>
                </form>
                
            </Paper>
        </div>
    );
}

function OkProveedor({setSoyProveedor, soyProveedor}) {
    const manejarCambio = (event) => {
    setSoyProveedor(!soyProveedor);
    };

    return (
        <FormControlLabel
            control={<Checkbox checked={!soyProveedor} onChange={manejarCambio} name="checkedB" color="primary"/>}
            label="Soy proveedor de servicios"
        />       
    );
}
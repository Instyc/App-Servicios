import React,{useState, useEffect, useContext} from 'react';

//Material UI
import {LinearProgress, FormControl ,Typography, TextField, Button, Divider, Link, Paper, Grid, Checkbox, FormControlLabel, Hidden} from '@material-ui/core/';

//Libreria para consultar la API del servidor
import axios from 'axios';

//Componentes creados
import Estilos from '../Estilos.js';
import SubirImagen from '../SubirImagen.js';
import InicioSesion from "../Sesion/InicioSesion.js";

import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function Registrar({registrar}) {
    const classes = Estilos()
    //Variables de la página
    const [mensaje, setmensaje] = useState("");
    const [tituloPagina, settituloPagina] = useState("")
    const [cargando, setcargando] = useState(false)
    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
    //

    const [pictures, setPictures] = useState([]);
    
    //Variables de los campos   
    const [datos, setdatos] = useState({
        nombre:"",
        apellido:"",
        email:"",
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
        if(mensaje!=="")
            setmensaje("")
        
        let valor = e.target.value;
        let campo = e.target.name;
        setdatos({
            ...datos,
            [campo]: valor
        })        
    }

    const registrarUsuario = (e) =>{
        e.preventDefault();
        if(datos.contrasena!==datos.contrasena_rep){
            setmensaje("Las contraseñas no coinciden")
        }else if(datos.contrasena.length < 8){
            setmensaje("La contraseña debe tener al menos 8 caracteres");
        }else if(datos.email.search('[.][a-z][a-z]')=== -1 || datos.email.search('[.].*[0-9].*')!== -1 ){
            setmensaje("El email se encuentra escrito incorrectamente");
        }else{
            setcargando(true)
            axios
                .post(state.servidor+"/auth/local/register", {
                    username: datos.usuario,
                    email: datos.email,
                    password: datos.contrasena,
                    nombre: datos.nombre,
                    apellido: datos.apellido,
                    telefono: datos.telefono,
                    dni: datos.dni,
                    descripcion: datos.descripcion,
                    tipo: soyProveedor?1:2
                })
                .then(response => {
                    // Se registró el usuario correctamente
                    console.log('Se ha registrado correctamente el usuario')
                    
                    dispatch({type:"setDatos", value: response.data.user})
                    dispatch({type:"setJwt", value: response.data.jwt})
                    setcargando(false)
                })
                .catch(error => {
                    // Ocurrió un error
                    let err = JSON.parse(error.response.request.response).message[0].messages[0].id;
                    if(err==="Auth.form.error.email.taken")
                        setmensaje('El email ya está en uso.');
                    
                    if(err==="Auth.form.error.username.taken")
                        setmensaje('El usuario ya está en uso.');

                    setcargando(false)
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
                            type="text"
                            name="nombre"
                            value={datos.nombre}
                            onChange={cambiarInput}
                            id="filled-basic"
                            label="Nombre"
                            variant="filled"
                            required/>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                            className={classes.inputAncho}
                            type="text"
                            name="apellido"
                            value={datos.apellido}
                            onChange={cambiarInput}
                            id="filled-basic"
                            label="Apellido"
                            variant="filled"
                            required/>
                        </Grid>

                        <Grid item xs={12}>
                            <SubirImagen cantidad={1}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                            className={classes.inputAncho}
                            name="email"
                            value={datos.email}
                            onChange={cambiarInput}
                            id="filled-basic"
                            label="Correo electrónico"
                            variant="filled"
                            type="email"
                            required />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                            className={classes.inputAncho}
                            name="usuario"
                            value={datos.usuario}
                            onChange={cambiarInput}
                            id="filled-basic"
                            label="Usuario"
                            variant="filled"
                            required />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                            className={classes.inputAncho}
                            type="number"
                            name="telefono"
                            value={datos.telefono}
                            onChange={cambiarInput}
                            id="filled-basic"
                            label="Telefono"
                            variant="filled"/>
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

                        <Hidden xlDown={mensaje===""}>
                            <Grid item xs={12}>
                                <Typography color="error">
                                    {mensaje}
                                </Typography>
                            </Grid>
                        </Hidden>

                        <Grid item xs={12}>
                            <OkProveedor soyProveedor={soyProveedor} setSoyProveedor={setSoyProveedor}/>
                            <div hidden={soyProveedor}>
                                <Grid container spacing={1} direction="row" alignItems="center">
                                    <Grid item xs={12} align="center">
                                        <TextField
                                        name="dni"
                                        type="number"
                                        value={datos.dni}
                                        onChange={cambiarInput}
                                        id="filled-basic"
                                        label="DNI"
                                        variant="filled"/>
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <SubirImagen cantidad={2}/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                        name="descripcion"
                                        value={datos.descripcion}
                                        onChange={cambiarInput}
                                        className={classes.inputAncho}
                                        id="filled-basic"
                                        label="Descripción"
                                        variant="filled"
                                        multiline/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <div className={classes.inputAncho} hidden={!cargando}>
                            <LinearProgress />
                        </div>
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
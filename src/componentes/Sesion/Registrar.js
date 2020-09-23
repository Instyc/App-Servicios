import React,{useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Estilos from '../Estilos.js';

import SubirImagen from '../SubirImagen.js';
import InicioSesion from "../Sesion/InicioSesion.js";

export default function Registrar({registrar}) {
    const classes = Estilos();
    const [pictures,setPictures] = useState([]);
    const [soyProveedor,setSoyProveedor] = useState(true);

    /*Cuando se renderiza la pagina debemos saber si ha sido invocada para registrar un usuario o
    para modificar datos
    */
    useEffect(()=>{
        if(!registrar){
            setusuario({
                nombre:"Darío",
                apellido:"Aznar",
                imagenPerfil:"x",
                correo:"darioaznar@gmail.com",
                usuario:"darazna",
                telefono:"44122312345",
                dni:"21543749",
                imagenDni:["",""],
                descripcion:"Esto es una descripción"
            })
        }
    },[])
    
    //Datos de la pagina
    const [usuario,setusuario] = useState({
        nombre:"",
        apellido:"",
        imagenPerfil:"",
        correo:"",
        usuario:"",
        telefono:"",
        dni:"",
        imagenDni:["",""],
        descripcion:""
    });

    function onDrop(pictureFiles, pictureDataURLs){
        setPictures(pictureFiles);
    }
    return (
        <div className={classes.fondo}>
            <Paper elevation={3} >
                <Grid className={classes.gridRegistro} spacing={1} container justify="space-between" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h1" align="center" className={classes.inputAncho}>
                            Registrar Usuario
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField className={classes.inputAncho} value={usuario.nombre} id="filled-basic" label="Nombre" variant="filled" required/>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField className={classes.inputAncho} value={usuario.apellido} id="filled-basic" label="Apellido" variant="filled" required/>
                    </Grid>

                    <Grid item xs={12}>
                        <SubirImagen cantidad={1}/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField className={classes.inputAncho} value={usuario.correo} id="filled-basic" label="Correo electrónico" variant="filled" type="email" required />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField className={classes.inputAncho} value={usuario.usuario} id="filled-basic" label="Usuario" variant="filled" required />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField className={classes.inputAncho} value={usuario.telefono} id="filled-basic" label="Telefono" variant="filled"/>
                    </Grid>
                    <Divider/>

                    <Grid item xs={6}>
                        <TextField
                            required
                            type="password"
                            label="Contraseña"
                            variant="filled"
                            className={classes.inputAncho} 
                        />
                    </Grid>

                    <Grid item xs={6}> 
                        <TextField
                            required
                            type="password"
                            label="Repetir contraseña"
                            variant="filled"
                            className={classes.inputAncho}
                        />
                    </Grid>
                        
                    <Grid item xs={12}>
                        <OkProveedor soyProveedor={soyProveedor} setSoyProveedor={setSoyProveedor}/>
                        <div hidden={soyProveedor}>
                            <Grid container spacing={1} direction="row" alignItems="center">
                                <Grid item xs={12} align="center">
                                    <TextField value={usuario.dni} id="filled-basic" label="DNI" variant="filled"/>
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <SubirImagen cantidad={2}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField value={usuario.descripcion} className={classes.inputAncho} id="filled-basic" label="Descripción" variant="filled" multiline/>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <Button className={classes.inputAncho} size="large" variant="contained" color="primary">Registrar Usuario</Button>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <InicioSesion mensaje={"¿Ya tenés una cuenta?"}/>
                    </Grid>
                </Grid>
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
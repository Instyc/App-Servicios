import React,{useState, useEffect, useContext} from 'react';
import axios from 'axios'

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//import {useDropzone} from 'react-dropzone';
import ImageGallery from 'react-image-gallery';
import SubirImagenes from '../SubirImagen.js';
import InputLabel from '@material-ui/core/InputLabel';

import Estilos from '../Estilos.js';
import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function CrearPublicacion({tipoPublicacion, modificar}) {
    const classes = Estilos();
    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);

    const [precioPresupuesto, setPrecioPresupuesto] = useState("");
    const [titulo, setTitulo] = useState("");
    const [categorias, setcategorias] = useState([]);
    const [servicios, setservicios] = useState([]);
    const [cargando, setcargando] = useState(false);
    const [imagenes, setimagenes] = useState([]);

    //Datos de la pagina
    const [datosPagina, setdatosPagina] = useState({
        titulo:"",
        precio_estimado:"",
        categoria: "",
        servicio: "",
        descripcion:"",
        imagenes:[],
        pausado: false,
        bloqueado: false
    });

    useEffect(()=>{
        //Dependiendo de si se quiere crear una publicación o solicitar un servicio, se muestra la pantalla correspodiente
        if(tipoPublicacion){
            setTitulo(modificar?"Modificar publicación":"Crear publicación");
            setPrecioPresupuesto("Precio estimado");
        }else{
            setTitulo(modificar?"Modificar solicitud de servicio":"Solicitar servicio");
            setPrecioPresupuesto("Presupuesto");
        }

        if(modificar){
            setdatosPagina({
                titulo:"Mesas",
                precio:"$300",
                categoria:"Plomería",
                servicio:"Destapar cloaca",
                descripcion:"Mesas de algarrobo",
                imagenes:[""]
            })
        }

        axios.get(state.servidor+"/api/categorias")
        .then(response => {
            setcategorias(response.data)
            setcargando(false)
        console.log("Categorias:",response.data)
        })
        .catch(error => {
        alert("Un error ha ocurrido al cargar las categorías.")
        console.log(error.response)
        }) 
    },[])

    function modificarInput(e){
        setdatosPagina({
            ...datosPagina,
            [e.target.name]: e.target.value
        })  
        console.log(datosPagina)
    }
    
    const funcionSetImagen = (file, cantidad, tipo) =>{
        //Si es 0, entonces se agrega la imagen a su respectiva variable, si es 1 entonces se desea eliminar
        if(tipo===0){
            setimagenes([...imagenes, file])
        }else{
            let aux = imagenes.filter(f => f !== file)
            setimagenes(aux)
        }
    }
    useEffect(()=>{console.log(imagenes)},[imagenes])

    const guardarDatos = (e) => {
        e.preventDefault()

        const formData = new FormData()

        for(let i =0; i<imagenes.length; i++){
            formData.append('files.imagenes', imagenes[i])
        }
        formData.append('data', JSON.stringify({
            titulo: datosPagina.titulo,
            precio_estimado: datosPagina.precio_estimado,
            descripcion: datosPagina.descripcion,
            Categoria_id: datosPagina.categoria.id,
            Servicio_id: datosPagina.servicio.id,
            Usuario_id: state.datosSesion.id,
            pausado: false,
            bloqueado: false,
            tipo: tipoPublicacion
        }))

        let auth = 'Bearer '+state.jwt;

        axios.post(
            state.servidor+"/api/solicitud",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': auth
                },
        })
        .then(response => {
            console.log("Respuesta subir solicitud: ",response.data)
        })
        .catch(error => {
            console.log("Error, no se ha podido crear la solicitud.", error.response)
        })
        
    }
    function seleccionarCategoria(e){
        setservicios(e.target.value.servicios)

        setdatosPagina({
            ...datosPagina,
            categoria: e.target.value,
            servicio:""
        })
    }


    return (
    <div className={classes.fondo} >
        <Paper elevation={3}>
            <form onSubmit={guardarDatos}>
                <FormControl className={classes.padding2} color="primary" fullWidth>
                    <Grid className={classes.pantallaMedia} container direction="row" justify="center" alignItems="center" spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h1" align="center">
                                {titulo}
                            </Typography>
                        </Grid>
                        
                        <Grid item sm={8} xs={12}>
                            <TextField
                            onChange={modificarInput}
                            value={datosPagina.titulo}
                            name="titulo"
                            className={classes.inputAncho}
                            id="filled-basic"
                            label="Título de la publicación"
                            variant="filled"
                            required/>
                        </Grid>

                        <Grid item sm={4} xs={12}>
                            <TextField
                            onChange={modificarInput}
                            value={datosPagina.precio_estimado}
                            name="precio_estimado"
                            type="number"
                            className={classes.inputAncho}
                            id="formatted-numberformat-input"
                            label={precioPresupuesto}
                            variant="filled"/>
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <FormControl className={classes.inputAncho}>
                                <InputLabel id="filled-basic"  variant="filled">Categoría</InputLabel>
                                <Select value={datosPagina.categoria} name="categoria" onChange={seleccionarCategoria} id="filled-basic" label="Categoría" variant="filled" required>
                                    {
                                        categorias.map((categoria, i)=>(
                                            <MenuItem key={i} value={categoria}>{categoria.nombre}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <FormControl className={classes.inputAncho}>
                                <InputLabel id="filled-basic" variant="filled">Servicio</InputLabel>
                                <Select 
                                    value={datosPagina.servicio}
                                    name="servicio" 
                                    onChange={
                                        (e)=>{setdatosPagina({
                                            ...datosPagina,
                                            [e.target.name]: e.target.value    
                                        })
                                        console.log(e.target.value)
                                    }} 
                                    label="Servicio" variant="filled" required>
                                    {
                                        servicios.map((servicio, i)=>(
                                            <MenuItem key={i} value={servicio}>{servicio.nombre}</MenuItem>
                                        ))
                                    }   
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                            onChange={modificarInput}
                            value={datosPagina.descripcion}
                            name="descripcion"
                            className={classes.inputAncho}
                            id="filled-basic"
                            label="Descripción"
                            multiline
                            variant="filled"/>
                        </Grid>

                        <Grid item xs={12} className={classes.inputAncho}>
                            <SubirImagenes cantidad={10} funcionSetImagen={funcionSetImagen} ids={[]}/>
                        </Grid>

                        <Grid item xs={6} align="center">
                            <Button className={classes.botones} type="submit" size="large" variant="contained" color="primary">Guardar</Button>
                        </Grid>
                        <Grid item xs={6} align="center">
                            <Button className={classes.botones} size="large" variant="contained" color="secondary">Cancelar</Button>
                        </Grid>
                    </Grid>
                </FormControl>
            </form>
        </Paper>
    </div>
  );
}
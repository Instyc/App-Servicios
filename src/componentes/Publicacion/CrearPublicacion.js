import React,{useState, useEffect, useContext} from 'react';
import axios from 'axios'
import {useHistory } from 'react-router-dom'

import {Typography, TextField, FormControl, Button, Paper, Grid, Select, MenuItem, InputLabel, Hidden} from '@material-ui/core';
import SubirImagenes from '../SubirImagen.js';
import {useParams} from 'react-router-dom'
import Cargando from '@material-ui/core/LinearProgress';

import Estilos from '../Estilos.js';
import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function CrearPublicacion({tipoPublicacion, modificar}) {
    const classes = Estilos();
    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
    let { id } = useParams();
    let history = useHistory();
    const [precioPresupuesto, setPrecioPresupuesto] = useState("");
    const [titulo, setTitulo] = useState("");
    const [categorias, setcategorias] = useState([]);
    const [servicios, setservicios] = useState([]);
    const [cargando, setcargando] = useState(false);
    const [imagenes, setimagenes] = useState([]);
    const [imagenesSubidas, setimagenesSubidas] = useState([]);

    //Datos de la pagina
    const [datosPagina, setdatosPagina] = useState({
        titulo:"",
        precio_estimado: "",
        Categoria_id: {nombre: ""},
        Servicio_id: {nombre:""},
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
        if (state.jwt!=="" || state.publico===true){
            setcargando(true)
            axios.get(state.servidor+"/api/categorias")
            .then(response => {
                setcategorias(response.data)
                setcargando(false)
            })
            .catch(error => {
            alert("Un error ha ocurrido al cargar las categorías.")
            console.log(error.response)
            })
        }
    },[state.jwt, state.publico, tipoPublicacion, modificar])

    useEffect(()=>{
        if(modificar && categorias.length!==0){
            setcargando(true)
            axios.get(state.servidor+"/api/solicitud/"+id)
            .then(response => {             
                if (state.datosSesion.id===response.data.Usuario_id.id){
                    response.data["imagenes"] = response.data.imagenes.map((imagen)=>(imagen.id))
                    console.log(response.data)

                    setdatosPagina(response.data)
                    if (tipoPublicacion)
                        categorias.map(cat =>{
                            if(cat.id===response.data.Servicio_id.categoria){
                                setservicios(cat.servicios)
                            }
                        })
                }else{
                    history.push("/")
                }
                setcargando(false)
            })
            .catch(error => {
                alert("Un error ha ocurrido al cargar la solicitud.")
                console.log(error.response)
            })
        }
    },[categorias])
    
    //Funcion para captar los cambios en los inputs 
    function modificarInput(e){
        setdatosPagina({
            ...datosPagina,
            [e.target.name]: e.target.value
        })
    }
    
    const funcionSetImagen = (file, cantidad, tipo, subidas) =>{
        console.log(subidas)
        //Si es 0, entonces se agrega la imagen a su respectiva variable, si es 1 entonces se desea eliminar
        if(tipo===0){
            setimagenes([...imagenes, file])
        }else{
            let aux = imagenes.filter(f => f !== file)
            setimagenes(aux)
        }
        
        setimagenesSubidas(subidas)
    }

    const guardarDatos = (e) => {
        e.preventDefault()
        setcargando(true)
        const formData = new FormData()

        console.log(imagenes)
        console.log(imagenesSubidas)
        let archivosPosta = imagenes.map((imagen) => {
            imagenesSubidas.map(subida => {
                if(subida !== imagen){
                    return imagen
                }
            })
        })
        console.log(archivosPosta)

        for(let i = 0; i<imagenes.length; i++){
            formData.append('files.imagenes', imagenes[i])
        }
        formData.append('data', JSON.stringify({
            titulo: datosPagina.titulo,
            precio_estimado: datosPagina.precio_estimado===""?0:datosPagina.precio_estimado,
            descripcion: datosPagina.descripcion,
            Categoria_id: datosPagina.Categoria_id.id,
            Servicio_id: datosPagina.Servicio_id.id,
            Usuario_id: state.datosSesion.id,
            pausado: false,
            bloqueado: false,
            tipo: tipoPublicacion
        }))

        let auth = 'Bearer '+state.jwt;

        if (!modificar){
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
                setcargando(false)
                history.push("/")
            })
            .catch(error => {
                console.log("Error, no se ha podido crear la solicitud.", error.response)
            })
        }else{
            axios.put(
                state.servidor+"/api/solicitud/"+id,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': auth
                },
            })
            .then(response => {
                console.log("Respuesta modificar solicitud: ",response.data)
                setcargando(false)
                history.push("/")
            })
            .catch(error => {
                console.log("Error, no se ha podido modificar la solicitud.", error.response)
            })
        }
    }
    function seleccionarCategoria(e){
        let categoriaSeleccionada = categorias.filter((cat) => cat.nombre === e.target.value)
        setservicios(categoriaSeleccionada[0].servicios)
        setdatosPagina({
            ...datosPagina,
            Categoria_id: categoriaSeleccionada[0],
            Servicio_id: {nombre:""}
        })
    }
    function seleccionarServicio(e){
        let servicioSeleccionado
        categorias.map((cat) =>{
            if(cat.nombre===datosPagina.Categoria_id.nombre){
                servicioSeleccionado = cat.servicios.filter((serv) => serv.nombre === e.target.value)
            }
        })
        console.log(servicioSeleccionado[0])
        setdatosPagina({
            ...datosPagina,
            Servicio_id: servicioSeleccionado[0]   
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
                                <InputLabel id="Categoria_id" variant="filled">Categoría</InputLabel>
                                <Select
                                    value={datosPagina.Categoria_id.nombre}
                                    name="Categoria_id"
                                    onChange={seleccionarCategoria}
                                    id="Categoria_id"
                                    labelId="Categoria_id"
                                    variant="filled"
                                    label="Categoría"
                                    required>
                                    {
                                        categorias.map((categoria, i)=>(
                                            <MenuItem key={i} value={categoria.nombre}>{categoria.nombre}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Hidden xlDown={!tipoPublicacion}>
                            <Grid item sm={6} xs={12}>
                                <FormControl className={classes.inputAncho}>
                                    <InputLabel id="Servicio_id" variant="filled">Servicio</InputLabel>
                                    <Select 
                                        value={datosPagina.Servicio_id.nombre}
                                        name="Servicio_id"
                                        id="Servicio_id"
                                        labelId="Servicio_id"
                                        onChange={seleccionarServicio} 
                                        label="Servicio"
                                        variant="filled"
                                        required>
                                        {
                                            servicios.map((servicio, i)=>(
                                                <MenuItem key={i} value={servicio.nombre}>{servicio.nombre}</MenuItem>
                                            ))
                                        }   
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Hidden>

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
                            <SubirImagenes cantidad={10} funcionSetImagen={funcionSetImagen} ids={datosPagina.imagenes}/>
                        </Grid>
                        
                        <Grid item xs={12} className={classes.inputAncho}>
                            {cargando && <Cargando/>}
                        </Grid>

                        <Grid item xs={6} align="center">
                            <Button className={classes.botones}  type="submit" size="large" variant="contained" color="primary">Guardar</Button>
                        </Grid>
                        <Grid item xs={6} align="center">
                            <Button disabled={cargando} className={classes.botones} size="large" variant="contained" color="secondary">Cancelar</Button>
                        </Grid>
                    </Grid>
                </FormControl>
            </form>
        </Paper>
    </div>
  );
}
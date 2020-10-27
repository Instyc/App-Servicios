import React,{useState, useContext, useEffect} from 'react';
import {useHistory } from 'react-router-dom'

//Material-UI
import {Hidden, Typography, TextField, FormControl, Button, Paper, Grid, Checkbox, FormControlLabel} from '@material-ui/core/';
import BarraDeCarga from '@material-ui/core/LinearProgress'
//Componentes
import SubirImagenes from '../SubirImagen.js';
import CategoriaSeleccion from '../CategoriaSeleccion.js';
import Estilos from '../Estilos.js';
import SeleccionarServicio from '../SeleccionarServicio.js';

import axios from 'axios';

import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function Registrar() {
    const classes = Estilos();
    let history = useHistory();
    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
    const [cargando, setcargando] = useState(false)
    const [controlGuardar, setcontrolGuardar] = useState(false)
    const [categorias, setcategorias] = useState([])
    const [idServicios, setidServicios] = useState([])

    const [datos, setdatos] = useState({
        descripcion: state.datosSesion.descripcion,
        estado: state.datosSesion.estado,
        mostrar_telefono: state.datosSesion.mostrar_telefono,
    });

    const [imagenes, setimagenes] = useState([])
    const funcionSetImagen = (file, cantidad, tipo) =>{
        //Si es 0, entonces se agrega la imagen a su respectiva variable, si es 1 entonces se desea eliminar
        if(tipo===0){
            setimagenes([...imagenes, file])
        }else{
            let aux = imagenes.filter(f => f !== file)
            setimagenes(aux)
        }
    }

    useEffect(()=>{
        axios.get(
            state.servidor+"/api/categorias"
        )
        .then(response => {
            response.data.map((item)=>{
                item["seleccionado"] = false

                item.servicios.map((itemserv) =>{
                    itemserv["seleccionado"] = false
                })

                if(state.datosSesion.servicios.length!==0){
                    response.data.map((categoria) =>{
                        categoria.servicios.map((servicio) =>{

                            state.datosSesion.servicios.map((servicioSesion)=>{
                                if(servicioSesion.categoria === categoria.id){
                                    categoria.seleccionado = true
                                }

                                if(servicioSesion.id===servicio.id){
                                    servicio.seleccionado = true
                                }
                            })

                        })
                    })
                }                
            })

            console.log(response.data)
            setcategorias(response.data)
        })
        .catch(error => {
            alert("Un error ha ocurrido")
            console.log(error.response)
        }) 
        
        setdatos({
            descripcion: state.datosSesion.descripcion,
            estado: state.datosSesion.estado,
            mostrar_telefono: state.datosSesion.mostrar_telefono,
        })
    },[])

    const cambiarCheckbox = (e) =>{  
        if(!controlGuardar)
            setcontrolGuardar(true)
        
        let valor = e.target.checked;
        let campo = e.target.name;
        setdatos({
            ...datos,
            [campo]: valor
        })
    }

    useEffect(()=>{
        if(idServicios.length!==0 || controlGuardar){
            let auth = 'Bearer '+state.jwt;
            setcargando(true)
            axios.put(
                state.servidor+"/users/"+state.datosSesion.id
                ,{
                    descripcion: datos.descripcion,
                    estado: datos.estado,
                    mostrar_telefono: datos.mostrar_telefono,
                    servicios : idServicios
                },
                {
                    headers: {
                        'Authorization': auth
                    },
                }
            )
            .then(response => {
                console.log("Respuesta cambio: ",response.data)
                dispatch({type:"setDatos", value: response.data})

                localStorage.setItem('datosLocal', JSON.stringify({
                    jwt: state.jwt,
                    datosSesion: response.data
                }));

                alert("Sus datos se han modificado correctamente!")

                setcargando(false)
                history.push("/")
            })
            .catch(error => {
                //let err = JSON.parse(error.response.request.response).message[0].messages[0].id;
                console.log(error.response)
                alert("Ha ocurrido un error al guardar los datos")
                setcargando(false)
            })
        }
    },[idServicios])

    const guardarDatos = () => {
        let aux = [];
        categorias.map((categoria)=>{
            if(categoria.seleccionado){
                categoria.servicios.map((servicio)=>{
                    if(servicio.seleccionado){
                        aux.push(servicio.id)
                    }
                })
            }
        })

        setidServicios(aux)
    }
    
    return (
        <div className= {classes.fondo}>
            <Paper elevation={3} className= {classes.pantallaMedia}>
                <FormControl color="primary" fullWidth>
                    <Grid className={classes.filaPublicacion} container direction="row" justify="space-around" alignItems="center" spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h1" align="center">
                                Modificar mis datos de proveedor
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>    
                            <FormControlLabel
                                className={classes.inputAncho}
                                control={<Checkbox checked={datos.estado} name="estado" onChange={cambiarCheckbox}/>}
                                label="Pausar mis servicios"
                            />
                        </Grid>

                        <Grid item xs={12}>    
                            <FormControlLabel
                                className={classes.inputAncho}
                                control={<Checkbox name="mostrar_telefono" checked={datos.mostrar_telefono} onChange={cambiarCheckbox}/>}
                                label="Mostrar mi número de teléfono"
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                            className={classes.inputAncho}
                            onChange={(e)=>{
                                setdatos({
                                ...datos,
                                descripcion: e.target.value
                                })
                                if(!controlGuardar)
                                    setcontrolGuardar(true)
                            }}
                            name="descripcion"
                            value={datos.descripcion}
                            id="filled-basic"
                            label="Descripción"
                            multiline
                            variant="filled"/>
                        </Grid>

                        <Grid item xs={12} className={classes.inputAncho}>
                            <SubirImagenes cantidad={10} funcionSetImagen={funcionSetImagen} ids={[]}/>
                        </Grid>

                        <Grid item xs={12} >
                            <Typography variant="h6" component="h3" align="left" className={classes.alinearInputs}>
                                Selecciona los servicios que ofreces
                            </Typography>
                        </Grid>
                        
                        
                        {
                            categorias.map((categoria, i)=>(
                                <Grid key={i} item xs={12}>
                                    <Grid container justify="flex-start">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={categoria.seleccionado}
                                                    onChange={(e)=>{setcategorias(categorias.map((cat, j)=>{
                                                        if(i===j){
                                                            cat.seleccionado = e.target.checked
                                                        }
                                                        return cat
                                                    }))}}
                                                />}
                                            label={categoria.nombre}
                                        />
                                    </Grid>
                                    <Hidden xlDown={!categoria.seleccionado}>
                                        <Grid container spacing={2} justify="space-around">    
                                            {
                                                categoria.servicios.map((servicio,k) => (
                                                <Grid item xs={6} sm={4} md={3} lg={2} key={k}>
                                                    <SeleccionarServicio
                                                    servicio={servicio} 
                                                    agregarSeleccionado={(valor)=>{
                                                        servicio.seleccionado = valor
                                                        //Asignamos los valores "true" a aquellos servicios que son seleccionados
                                                        setcategorias(categorias.map((cat, j)=>{
                                                            if(i===j){
                                                                cat.servicios[k] = servicio
                                                            }
                                                            return cat
                                                        }))
                                                    }}/>
                                                </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </Hidden>
                                </Grid>
                            ))
                        }
                        
                        
                        <div className={classes.inputAncho} hidden={!cargando}>
                            <BarraDeCarga/>
                        </div>

                        <Grid item xs={6} align="center">
                            <Button onClick={guardarDatos} size="large" variant="contained" color="primary">Guardar</Button>
                        </Grid>
                        <Grid item xs={6} align="center">
                            <Button size="large" variant="contained" color="secondary">Cancelar</Button>
                        </Grid>
                    </Grid>
                </FormControl>
            </Paper>
        </div>
    );
}



import React,{useState, useContext} from 'react';
//Material-UI
import {Typography, TextField, FormControl, Button, Paper, Grid, Checkbox, FormControlLabel} from '@material-ui/core/';

//Componentes
import SubirImagenes from '../SubirImagen.js';
import CategoriaSeleccion from '../CategoriaSeleccion.js';
import Estilos from '../Estilos.js';

import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function Registrar() {
    const classes = Estilos();
    const [pictures,setPictures] = useState([]);
    const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
    const [seleccionado, setSeleccionado] = useState(false);

    const [datos, setdatos] = useState({
        descripcion:"",
        estado: false,
        mostrar_telefono: false,
        img: [],
        
    });

    const manejarCambio = () =>{
        setSeleccionado(!seleccionado);
    }

    const cambiarInput = (e) =>{        
        let valor = e.target.value;
        let campo = e.target.name;
        setdatos({
            ...datos,
            [campo]: valor
        })
    }
    
    const funcionSetImagen = () =>{
        
    }

    const guardarDatos = () => {

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
                                control={<Checkbox name="checkedA" />}
                                label="Pausar mis servicios"
                            />
                        </Grid>

                        <Grid item xs={12}>    
                            <FormControlLabel
                                className={classes.inputAncho}
                                control={<Checkbox name="checkedA" />}
                                label="Mostrar mi número de teléfono"
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                            className={classes.inputAncho}
                            value={state.datosSesion.descripcion}
                            id="filled-basic"
                            label="Descripción"
                            multiline
                            variant="filled"/>
                        </Grid>

                        <Grid item xs={12} className={classes.inputAncho}>
                            <SubirImagenes cantidad={10} funcionSetImagen={funcionSetImagen} ids={[state.datosSesion.img_dni1, state.datosSesion.img_dni1]}/>
                        </Grid>

                        <Grid item xs={12} >
                            <Typography variant="h6" component="h3" align="left" className={classes.alinearInputs}>
                                Selecciona los servicios que ofreces
                            </Typography>
                        </Grid>

                        <Grid item xs={12} >
                            <Grid container justify="flex-start">
                                <FormControlLabel
                                control={<Checkbox onChange={manejarCambio} checked={seleccionado} name="checkedA" />}
                                label="Categoría 1"
                                />
                            </Grid>
                            <CategoriaSeleccion seleccionado={seleccionado}/>
                        </Grid>

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



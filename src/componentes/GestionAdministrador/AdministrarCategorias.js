import React,{useEffect, useState, useContext} from 'react';

//Material-UI
import {TableRow, TableContainer, TableCell, TableBody, Box, Table, Collapse, Paper, Grid, Typography, TextField, Tooltip, IconButton, Hidden } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Agregar from '@material-ui/icons/AddCircle';
import Editar from '@material-ui/icons/Edit';
import Eliminar from '@material-ui/icons/DeleteForever';
import Guardar from '@material-ui/icons/Save';
import Cancelar from '@material-ui/icons/ClearTwoTone';

import Estilos from '../Estilos.js';
import AlertaSi_No from '../AlertaSi_No.js';
import PropTypes from 'prop-types';

import {  ObtenerEstado, ProveerEstadoCategoria  } from '../../Estados/CategoriaEstado'

export default function AdministrarCategorias() {
  const classes = Estilos();

  const { state, dispatch } = useContext(ObtenerEstado);

  const [editarControl, seteditarControl] = useState(false);
  const [filas, setfilas] = useState([
    'Categoría 1',
    'Categoría 2',
    'Categoría 3',
    'Categoría 4',
    'Categoría 5',
  ]);

  useEffect(()=>{
    console.log(state.estadoEditado);
  },[])
  
  const agregarCategoria = () =>{
    setfilas(["",...filas])
    dispatch({type:'setVerdad'});
  }
  
  return (
    <div className={classes.fondo}>
      <Paper elevation={5} style={{maxWidth:800}}>
        <Grid className={classes.filaPublicacion} container justify="center">
            <Typography variant="h4" component="h1" align="center">
              Administrar categorías y servicios 
            </Typography>
           
            <Grid item xs={12}>
                <Typography variant="h5" component="h3" align="left">
                    Categorías
                    <Hidden xlDown={state.estadoEditado}>
                      <Tooltip title="Agregar categoría">
                          <IconButton onClick={agregarCategoria}><Agregar color="primary" /></IconButton>
                      </Tooltip>
                    </Hidden>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TablaCategorias filas={filas}/>
            </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

function TablaCategorias({filas}) {
  return (
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
          <TableBody>
          {filas.map((fila, i) => (
              <Categoria key={i} categoria={fila}/>
          ))}
          </TableBody>
      </Table>
      </TableContainer>
  );
}

function Categoria({categoria}) {
  const { state, dispatch } = useContext(ObtenerEstado);
  const [open, setOpen] = useState(false);
  const [editar, seteditar] = useState(false);
  const [abrir, setabrir] = useState(false);

  const [servicios, setservicios] = useState([
    "Servicio 1",
    "Servicio 2",
    "Servicio 3"
  ]);

  const agregarServicio = () =>{
    setservicios(["",...servicios])
    dispatch({type:'setVerdad'});
  }

  useEffect(()=>{
    if(categoria===""){
      seteditar(true);
    }else{
      seteditar(false);
    }
  },[categoria])
  
  const editarNombre = () =>{
    seteditar(true)
    dispatch({type:'setVerdad'})
  }

  const cancelarEditar = () =>{
    dispatch({type:'setFalso'})
    seteditar(false)
  }
  const guardarEditar = () =>{
  }
  
  const eliminarCategoria = (boole) =>{
    setabrir(false)
    if(boole)
      console.log("elimna3")
  }  

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell >
            {
                !editar && categoria
            }
            <div hidden={!editar}>
                <TextField value={categoria} variant="filled" size="small"/>
                  <Tooltip title="Guardar">
                    <IconButton onClick={guardarEditar}><Guardar/></IconButton>
                  </Tooltip>
                  <Tooltip title="Cancelar">
                    <IconButton onClick={cancelarEditar}><Cancelar/></IconButton>
                  </Tooltip>
            </div>
        </TableCell>

        <TableCell align="right">
            <Hidden xlDown={state.estadoEditado}>
              <Tooltip title="Editar categoría">
                  <IconButton onClick={editarNombre}><Editar color="primary" /></IconButton>
              </Tooltip>
              <Tooltip title="Eliminar categoría">
                  <IconButton onClick={()=>{setabrir(true)}}><Eliminar color="error"/></IconButton>
              </Tooltip>
              {
                abrir && <AlertaSi_No mensaje="" funcionAceptar={eliminarCategoria} titulo="¿Está seguro que quiere eliminar la categoría?"/> 
              }
            </Hidden>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom >
                Servicios
                <Hidden xlDown={state.estadoEditado}>
                  <Tooltip title="Nuevo servicio">
                      <IconButton onClick={agregarServicio}><Agregar color="primary" /></IconButton>
                  </Tooltip>
                </Hidden>
              </Typography>
              <Table size="small" aria-label="purchases">
               
                <TableBody>
                    {
                      servicios.map((servicio, i)=>(
                        <FilaServicio key={i} nombre={servicio}/>
                      ))
                    }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function FilaServicio({nombre}) {
    const [editar, seteditar] = useState(false);
    const [abrir, setabrir] = useState(false);
    const { state, dispatch } = useContext(ObtenerEstado);
    
    const editarNombre = () =>{
      seteditar(true)
      dispatch({type:'setVerdad'})
    }
    
    useEffect(()=>{
      if(nombre===""){
        seteditar(true);
      }else{
        seteditar(false);
      }
    },[nombre])
  
    const cancelarEditar = () =>{
      dispatch({type:'setFalso'})
      seteditar(false)
    }

    const guardarEditar = () =>{
    }
    
    const eliminarServicio = (boole) =>{
      setabrir(false)
      if(boole)
          console.log("elimna3")
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">
              {
                  !editar && nombre
              }
              <div hidden={!editar}>
                  <TextField value={nombre} variant="filled" size="small"/>
                  <Tooltip title="Guardar">
                    <IconButton onClick={guardarEditar}><Guardar/></IconButton>
                  </Tooltip>
                  <Tooltip title="Cancelar">
                    <IconButton onClick={cancelarEditar}><Cancelar/></IconButton>
                  </Tooltip>
              </div>
            </TableCell>

            <TableCell align="right">
              <Hidden xlDown={state.estadoEditado}>
                <Tooltip title="Editar servicio">
                    <IconButton onClick={editarNombre}><Editar color="primary" /></IconButton>
                </Tooltip>
                <Tooltip title="Eliminar servicio">
                    <IconButton onClick={()=>{setabrir(true)}}><Eliminar color="error"/></IconButton>
                </Tooltip>
                {
                    abrir && <AlertaSi_No mensaje="" funcionAceptar={eliminarServicio} titulo="¿Está seguro que quiere eliminar el servicio?"/> 
                }
              </Hidden>
            </TableCell>
        </TableRow>
    );
  }


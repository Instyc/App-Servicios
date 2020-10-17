import React,{useEffect, useState} from 'react';

//Material-UI
import {TableRow, TableContainer, TableCell, TableBody, Box, Table, Collapse, Paper, Grid, Typography, TextField, Tooltip, IconButton, Button} from '@material-ui/core';
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

export default function AdministrarCategorias() {
  const classes = Estilos();
  const [editarControl, seteditarControl] = useState(false);
  const [filas, setfilas] = useState([
    'Categoría 1',
    'Categoría 2',
    'Categoría 3',
    'Categoría 4',
    'Categoría 5',
  ]);

  const agregarCategoria = () =>{
    setfilas(["",...filas])
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
                    <div hidden={editarControl}>
                      <Tooltip title="Agregar categoría">
                          <IconButton onClick={agregarCategoria}><Agregar color="primary" /></IconButton>
                      </Tooltip>
                    </div>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TablaCategorias filas={filas} seteditarControl={seteditarControl}/>
            </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

function TablaCategorias({filas, seteditarControl}) {
  return (
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
          <TableBody>
          {filas.map((fila, i) => (
              <Categoria key={i} categoria={fila} seteditarControl={seteditarControl}/>
          ))}
          </TableBody>
      </Table>
      </TableContainer>
  );
}

function Categoria({categoria, seteditarControl}) {
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
    seteditarControl(true)
  }

  const cancelarEditar = () =>{
    seteditar(false)
  }
  const guardarEditar = () =>{
    seteditarControl(false)
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
            <div hidden={editar}>
              <Tooltip title="Editar categoría">
                  <IconButton onClick={editarNombre}><Editar color="primary" /></IconButton>
              </Tooltip>
              <Tooltip title="Eliminar categoría">
                  <IconButton onClick={()=>{setabrir(true)}}><Eliminar color="secondary"/></IconButton>
              </Tooltip>
              {
                abrir && <AlertaSi_No mensaje="" funcionAceptar={eliminarCategoria} titulo="¿Está seguro que quiere eliminar la categoría?"/> 
              }
            </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 , background:"lightgreen"}} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Servicios
                <div hidden={editar}>
                  <Tooltip title="Nuevo servicio">
                      <IconButton onClick={agregarServicio}><Agregar color="primary" /></IconButton>
                  </Tooltip>
                </div>
              </Typography>
              <Table size="small" aria-label="purchases">
               
                <TableBody>
                    {
                      servicios.map((servicio, i)=>(
                        <FilaServicio nombre={servicio+categoria} seteditarControl={seteditarControl}/>
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

function FilaServicio({nombre, seteditarControl}) {
    const [editar, seteditar] = useState(false);
    const [abrir, setabrir] = useState(false);

    const editarNombre = () =>{
      seteditar(true)
    }
    
    useEffect(()=>{
      if(nombre===""){
        seteditar(true);
      }else{
        seteditar(false);
      }
    },[nombre])
  
    const cancelarEditar = () =>{
      seteditar(false)
    }

    const guardarEditar = () =>{
      seteditarControl(false)
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
              <div hidden={editar}>
                <Tooltip title="Editar servicio">
                    <IconButton onClick={editarNombre}><Editar color="primary" /></IconButton>
                </Tooltip>
                <Tooltip title="Eliminar servicio">
                    <IconButton onClick={()=>{setabrir(true)}}><Eliminar color="secondary"/></IconButton>
                </Tooltip>
                {
                    abrir && <AlertaSi_No mensaje="" funcionAceptar={eliminarServicio} titulo="¿Está seguro que quiere eliminar el servicio?"/> 
                }
              </div>
            </TableCell>
        </TableRow>
    );
  }


import React,{useEffect,useState} from 'react';

//Material-UI
import {TableRow, TableHead, TableContainer, TableCell, TableBody, Box, Table, Collapse, Paper, Grid, Typography, TextField, Tooltip, IconButton, Button} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Agregar from '@material-ui/icons/AddCircle';
import Editar from '@material-ui/icons/Edit';
import Eliminar from '@material-ui/icons/DeleteForever';

import Estilos from '../Estilos.js';
import AlertaSi_No from '../AlertaSi_No.js';
import PropTypes from 'prop-types';

export default function AdministrarCategorias() {
  const classes = Estilos();    
  
  
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
                    <Tooltip title="Agregar categoría">
                        <IconButton><Agregar color="primary" /></IconButton>
                    </Tooltip>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TablaCategorias/>
            </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

function createData(name) {
    return {
      name
    };
  }

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [editar, seteditar] = React.useState(false);
  const [abrir, setabrir] = React.useState(false);

  const editarNombre = () =>{
    seteditar(true)
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
                !editar && row.name
            }
            <div hidden={!editar}>
                <TextField value={row.name} variant="filled" size="small"/>
                <Button>Guardar</Button>
            </div>
        </TableCell>

        <TableCell align="right">
            <Tooltip title="Editar categoría">
                <IconButton onClick={editarNombre}><Editar color="primary" /></IconButton>
            </Tooltip>
            <Tooltip title="Eliminar categoría">
                <IconButton onClick={()=>{setabrir(true)}}><Eliminar color="secondary"/></IconButton>
            </Tooltip>
            {
                abrir && <AlertaSi_No mensaje="" funcionAceptar={eliminarCategoria} titulo="¿Está seguro que quiere eliminar el servicio?"/> 
            }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 , background:"lightgreen"}} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Servicios
                <Tooltip title="Nuevo servicio">
                    <IconButton><Agregar color="primary" /></IconButton>
                </Tooltip>
              </Typography>
              <Table size="small" aria-label="purchases">
               
                <TableBody>
                    <FilaServicio nombre="Servicio 1"/>
                    <FilaServicio nombre="Servicio 2"/>
                    <FilaServicio nombre="Servicio 3"/>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Categoría 1'),
  createData('Categoría 2'),
  createData('Categoría 3'),
  createData('Categoría 4'),
  createData('Categoría 5'),
];

function TablaCategorias() {
    return (
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableBody>
            {rows.map((row) => (
                <Row key={row.name} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

function FilaServicio({nombre}) {
    const [editar, seteditar] = React.useState(false);

    const editarNombre = () =>{
        seteditar(true)
    }
    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {
                    !editar && nombre
                }
                <div hidden={!editar}>
                    <TextField value={nombre} variant="filled" size="small"/>
                    <Button>Guardar</Button>
                </div>
            </TableCell>
            <TableCell align="right">
                <Tooltip title="Editar servicio">
                    <IconButton onClick={editarNombre}><Editar color="primary" /></IconButton>
                </Tooltip>
                <Tooltip title="Eliminar servicio">
                    <IconButton><Eliminar color="secondary" /></IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
  }


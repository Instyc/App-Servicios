import React, {useContext, useEffect, useState} from 'react';
import {Hidden, Paper, Grid, Typography, Avatar, Divider, Button, ListSubheader, List, ListItem, ListItemText, Tooltip, Collapse, IconButton} from '@material-ui/core';
import axios from 'axios'
import { Link  } from 'react-router-dom';

import PhoneIcon from '@material-ui/icons/Phone';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Verificado from '@material-ui/icons/CheckCircleOutline';
import Alerta from '@material-ui/lab/Alert';

import Estilos from '../Estilos.js';
import Estrellas from '../Estrellas.js';

import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function ProveedorInfo({esDePerfil, datosPerfil}) {
  const classes = Estilos();
  const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
  const [categorias, setcategorias] = useState([])

  const [DatosPerfil, setDatosPerfil] = useState({
    id: null,
    descripcion:"",
    titulo:"",
    identidad_verificada: false,
    telefono: "",
    mostrar_telefono: false,
    servicios: [],
    pausado: false,
    bloqueado: false
  })

  useEffect(()=>{
  if (state.jwt!=="" || state.publico===true)
    if(datosPerfil!==null){
      setDatosPerfil(datosPerfil)
      buscarCategorias(datosPerfil)
    }
  },[datosPerfil])

  function buscarCategorias(perfil){
    let ids_categorias = perfil.servicios.map((servicio) =>(servicio.categoria))
    let ids_consultas = ""

    ids_categorias.map((id)=>{
      ids_consultas+="id_in="+id+"&"
    })

    axios.get(
      state.servidor+"/api/categorias?"+ids_consultas
    )
    .then(response => {
      setcategorias(response.data)
    })
    .catch(error => {
      alert("Un error ha ocurrido al cargar las categorías.")
      console.log(error.response)
    }) 
  }

  return (
    <div className={classes.proveedorSticky}>
      <Paper elevation={5}>
        <Grid className={classes.padding} container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={12} className={esDePerfil?classes.EstiloPC:classes.EstiloVacio}>
              <Avatar
              alt="Remy Sharp"
              //src={state.servidor+DatosPerfil.img_perfil.url}
              src="https://i.pinimg.com/originals/69/1d/0c/691d0c155896f8ec64280648cac6fa22.jpg"
              className={classes.imagenPublicacion}/>
            </Grid>

            <Grid item xs={12} hidden={esDePerfil}>
              <Typography variant="h5" component="h3" align="center">
                <Link to={"/perfil-proveedor/"+DatosPerfil.id} className={classes.EstiloLink}>
                  {DatosPerfil.titulo}
                  <Hidden xlDown={!DatosPerfil.identidad_verificada}>
                    <Tooltip title="Usuario verificado">
                      <IconButton><Verificado color="primary"/></IconButton>
                    </Tooltip>
                  </Hidden>
                </Link>
              </Typography>
           </Grid>

           <Grid item xs={12} hidden={esDePerfil}>
           {
              DatosPerfil.pausado && (<Alerta className={classes.inputAncho} style={{marginBottom:"10px"}} variant="outlined" severity="warning">
                Este proveedor ha pausado sus servicios.
              </Alerta>)
            }
            {
              DatosPerfil.bloqueado && (<Alerta className={classes.inputAncho} style={{marginBottom:"10px"}} variant="outlined" severity="error">
                Este proveedor se encuentra bloqueado.
              </Alerta>)
            }
            </Grid>

           <Grid item xs={12} hidden={esDePerfil}>
              <Divider/> 
              <Typography variant="body1" component="p" align="justify"> 
                {DatosPerfil.descripcion}
              </Typography>
           </Grid>
            
           <Grid item xs={12}>
                <Divider/> 
                <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Servicios ofrecidos
                    </ListSubheader>
                }
                >
                    <Divider/>
                    {
                      categorias.map((categoria, i)=>(
                        <Categorias key={i} categoria={categoria} /> 
                      ))
                    }
                    <Divider/>
                </List>         
           </Grid>
           <Grid item xs={12}>
               Ubicacion
           </Grid>
           <Hidden xlDown={!DatosPerfil.mostrar_telefono}>
            <Grid item xs={12}>
                <Button startIcon={<PhoneIcon/>}>
                    {DatosPerfil.telefono}
                </Button>
            </Grid>
           </Hidden>
        </Grid>
      </Paper>

    </div>
  );
}

function Categorias({categoria}) {
    const classes = Estilos();
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={categoria.nombre}/>
                  <Estrellas clickeable={false} valor={3.3}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Divider/>
                      {
                        categoria.servicios.map((servicio, i) => (
                          <Typography key={i} variant="h6" component="h5" align="left">
                            <Link to={"/publicacion"} className={classes.EstiloLink}>
                              {servicio.nombre}
                            </Link>
                          </Typography>
                        ))
                      }
                    <Divider/>
                </List>
            </Collapse>
            
        </div>
    )
}
import React,{useState, useEffect} from 'react';
//Material-UI
import {Card, CardContent, Typography, CardActionArea, Chip, Button, Grid, Tooltip, IconButton } from '@material-ui/core/';
import Editar from '@material-ui/icons/Edit';
import Pausa from '@material-ui/icons/Pause';
import Eliminar from '@material-ui/icons/DeleteForever';

import Estrellas from '../Estrellas.js';
import Estilos from '../Estilos';
import {BotonContratar} from '../ContactarProveedor.js'

import {Link} from "react-router-dom";

export default function FilaPublicacion({tipoPublicacion, datos, contactar}) {
  const classes = Estilos();
  const [precioPresupuesto, setPrecioPresupuesto] = useState("");

  useEffect(()=>{
    //Dependiendo de si se quiere crear una publicación o solicitar un servicio, se muestra la pantalla correspodiente
    if(tipoPublicacion){
      setPrecioPresupuesto("Precio estimado");
    }else{
      setPrecioPresupuesto("Presupuesto");
    }
  },[])

  return (
    <Card className={classes.filaPublicacion}>
      <Grid container spacing={1} justify="center"> 
          <Grid container spacing={1} justify="center" alignItems="center"> 
            <Grid item xs={12} md={3} sm={12} align="center">
              <img 
                className={classes.imagenPublicacion}
                src={datos.imagen}
                alt="Live from space album cover"
              />
            </Grid>
            <Grid item xs={12} md={9} sm={12}>
              <Typography align="left" variant="h5" color="textPrimary" component="h5">
                {datos.nombreProveedor}
              </Typography>
              
              <Typography align="left" component="h5" variant="h5">
                  {datos.titulo}
                  <Link to={tipoPublicacion?"/modificar-publicacion":"/modificar-solicitud-servicio"}>
                    <Tooltip title="Editar publicación">
                      <IconButton><Editar color="primary" /></IconButton>
                    </Tooltip>
                  </Link>
                  <Tooltip title="Pausar publicación">
                    <IconButton><Pausa color="primary" /></IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar publicación">
                    <IconButton><Eliminar color="secondary" /></IconButton>
                  </Tooltip>
              </Typography>

              <div style={{overflow: "auto", textOverflow: "ellipsis", width: '100%', height:100, textJustify:"auto"}}> 
                <Typography>
                  {datos.descripcion}
                </Typography>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={8} sm={12} md={6} lg={3} align="center">
            <Typography component="h6" variant="h6" color="secondary">
              {precioPresupuesto}: {datos.precio}
            </Typography>
          </Grid>  
          <Grid item xs={4} sm={6} md={6} lg={3} align="center">
            <Chip clickable variant="outlined" label={datos.servicio}/>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3} align="center">
            <Estrellas valor={datos.estrellas}/>
          </Grid>   
          <Grid item xs={6} sm={6} md={6} lg={3} align="center" hidden={!contactar}>
            <BotonContratar/>
          </Grid>
           
        <Grid item xs={6} lg={12} md={12} sm={6} align="center">
          <Link to="/publicacion" style={{textDecoration:"none", padding: 0, color:"black"}}>
            <Button variant="outlined" color="primary">Leer más</Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
}







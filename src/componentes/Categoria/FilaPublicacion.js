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

export default function FilaPublicacion({tipoPublicacion}) {
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
        <Link to="/publicacion" style={{textDecoration:"none", padding: 10, color:"black"}}>   
          <Grid container spacing={1} justify="center" alignItems="center"> 
            <Grid item xs={12} md={3} sm={12} align="center">
              <img 
                className={classes.imagenPublicacion}
                src="data:image/png;base64,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"
                alt="Live from space album cover"
              />
            </Grid>
            <Grid item xs={12} md={9} sm={12}>
              <Typography align="left" variant="h5" color="textPrimary" component="h5">
                Proveedor de servicios
                
              </Typography>
              
              <Typography align="left" component="h5" variant="h5">
                  Titulo publicacion
                  <Tooltip title="Editar publicación">
                    <IconButton><Editar color="primary" /></IconButton>
                  </Tooltip>
                  <Tooltip title="Pausar publicación">
                    <IconButton><Pausa color="primary" /></IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar publicación">
                    <IconButton><Eliminar color="secondary" /></IconButton>
                  </Tooltip>
              </Typography>

              <div style={{overflow: "auto", textOverflow: "ellipsis", width: '100%', height:100, textJustify:"auto"}}> 
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur aiure?Lorem ipsum dolorsdam tempora, voluptates earum enim, exercitationem dolor itaque sunt molestiae, ducimus blanditiis rem adipisci! Eius, esse?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse consectetur aspernatur iste itaque delectus doloribus earum totam officiis nesciunt? A dolorem iure rerum laborum reiciendis ipsam impedit error quidem temporibus!
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Link>


        <Grid item xs={8} sm={12} md={6} lg={3} align="center">
          <Typography component="h6" variant="h6" color="secondary">
            {precioPresupuesto}: $400
          </Typography>
        </Grid>  
        <Grid item xs={4} sm={6} md={6} lg={3} align="center">
          <Chip clickable variant="outlined" label="Servicio"/>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3} align="center">
          <Estrellas/>
        </Grid>   
        <Grid item xs={6} sm={6} md={6} lg={3} align="center">
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







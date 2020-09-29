import React from 'react';
import {Paper, Grid, Typography, Avatar, Divider, Button, ListSubheader, List, ListItem, ListItemText, Collapse} from '@material-ui/core';

import PhoneIcon from '@material-ui/icons/Phone';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Estilos from '../Estilos.js';
import Estrellas from '../Estrellas.js';


export default function ProveedorInfo({esDePerfil}) {
  const classes = Estilos();
  return (
    <div className={classes.proveedorSticky}>
      <Paper elevation={5}>
        <Grid className={classes.padding} container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={12} className={esDePerfil && classes.EstiloPC}>
              <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR7Mt8wp9lo-dd73xpvjzPMcspQ8uwAThLitQ&usqp=CAU" className={classes.imagenPublicacion} />
            </Grid>
            <Grid item xs={12} hidden={esDePerfil}>
              <Typography variant="h5" component="h3" align="center">
                Andres Manuel Lopez Obrador
              </Typography>
           </Grid>

           <Grid item xs={12} hidden={esDePerfil}>
              <Divider/> 
              <Typography variant="body1" component="p" align="justify"> 
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias et commodi iste, inventore a fugiat? Asperiores minima corrupti magnam expedita laborum, quidem accusamus, repudiandae voluptate dolore, dicta blanditiis totam in?
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
                    <Categorias nombre="Categoria 1" />   
                    <Divider/> 
                    <Categorias nombre="Categoria 2" /> 
                    <Divider/> 
                </List>         
           </Grid>
           <Grid item xs={12}>
               Ubicacion
           </Grid>
           <Grid item xs={12}>
              <Button startIcon={<PhoneIcon/>}>
                  +54 9 3735 448855
              </Button>
           </Grid>
        </Grid>
      </Paper>

    </div>
  );
}



function Categorias({nombre}) {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={nombre}/>
                  <Estrellas valor={3.3}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Divider/>
                    <Typography variant="h6" component="h5" align="left">Servicio 1</Typography>
                    <Typography variant="h6" component="h5" align="left">Servicio 2</Typography>
                    <Typography variant="h6" component="h5" align="left">Servicio 3</Typography>
                    <Typography variant="h6" component="h5" align="left">Servicio 4</Typography>
                    <Divider/>
                </List>
            </Collapse>
            
        </div>
    )
}
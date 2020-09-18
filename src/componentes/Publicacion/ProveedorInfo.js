import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import PhoneIcon from '@material-ui/icons/Phone';
import Button from '@material-ui/core/Button';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Estilos from '../Estilos.js';

export default function ProveedorInfo() {
  const classes = Estilos();
  return (
    <div className={classes.proveedorSticky}>
      <Paper elevation={5}>
        <Grid className={classes.padding} container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={12}>
              <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR7Mt8wp9lo-dd73xpvjzPMcspQ8uwAThLitQ&usqp=CAU" className={classes.imagenPublicacion} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h3" align="center">
                Andres Manuel Lopez Obrador
              </Typography>
           </Grid>
           <Grid item xs={12}>
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
                <ListItemText primary={nombre} />
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
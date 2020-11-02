import React from 'react';
import {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';


import Estilos from '../Estilos.js'

export default function Filtro({tipoPublicacion, servicios, agregarSeleccionado, buscarServicios, inputBusqueda, setinputBusqueda}) {
  const classes = Estilos();

  return (
    <Card className={classes.margenArriba} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {
            tipoPublicacion?"Seleccione los filtros deseados":"Búsqueda por palabras:"
          }
        </Typography>

        {
          tipoPublicacion &&
          <Grid container className={classes.margenArriba} spacing={2} justify="space-around" alignItems="center">    
            {
              servicios.map((servicio,i) => (
                <Grid item xs={6} sm={4} md={3} lg={2}  key={i}>
                  <SeleccionarServicio key={i} servicio={servicio} agregarSeleccionado={agregarSeleccionado}/>
                </Grid>
              ))
            }
          </Grid>
        }
        <TextField
        className={classes.margenArriba}
        value={inputBusqueda}
        onChange={(e)=>{setinputBusqueda(e.target.value)}}
        onKeyDown={(e)=>{if(e.key==='Enter'){buscarServicios()}}}
        label="Buscar por nombre" variant="outlined"
        size="medium" fullWidth/>
        <Button onClick={buscarServicios} className={classes.margenArriba} color="secondary" variant="contained" >Buscar</Button>
      </CardContent>
    </Card>
  );
}

function SeleccionarServicio({servicio, agregarSeleccionado}) {
  const classes = Estilos();
  const [hecho_noHecho, setHecho_noHecho] = useState((<div><ClearIcon/></div>));
  const [seleccion, setSeleccion] = useState(false);

  const handleClick = () => {
    agregarSeleccionado(servicio.id)
    if(seleccion===false){
      setSeleccion(true);
      setHecho_noHecho(<div><DoneIcon/></div>);
    }else{
      setSeleccion(false);
      setHecho_noHecho(<div><ClearIcon/></div>);
    }
  };

  return (
    <div className={classes.mostrarFlex}>
      <Chip clickable variant="outlined" color="primary" label={servicio.nombre} icon={hecho_noHecho} onClick={handleClick}/>
    </div>
  );
}
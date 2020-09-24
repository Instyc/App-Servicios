import React, {useState, useEffect} from 'react';
import FilaPublicacion from '../Categoria/FilaPublicacion.js';
import Estilos from '../Estilos.js';
import { Typography, Paper } from '@material-ui/core';

export default function MisPublicaciones({tipoPublicacion}) {
    const classes = Estilos();
    const [titulo, setTitulo] = useState("");

    useEffect(()=>{
      //Dependiendo de si se quiere crear una publicación o solicitar un servicio, se muestra la pantalla correspodiente
      if(tipoPublicacion){
        setTitulo("Mis publicaciones");
      }else{
        setTitulo("Mis servicios solicitados");
      }
    },[])

    return (
      <div>
        <Paper elevation={5} className={classes.fondo} style={{marginTop:10}}>
            <Typography variant="h4" component="h2" align="left">{titulo}</Typography>

            <FilaPublicacion tipoPublicacion={tipoPublicacion}/>
            <FilaPublicacion tipoPublicacion={tipoPublicacion}/>
            <FilaPublicacion tipoPublicacion={tipoPublicacion}/>
        </Paper>
      </div>
    )
}

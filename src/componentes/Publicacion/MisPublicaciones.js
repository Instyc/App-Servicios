import React from 'react';
import FilaPublicacion from '../Categoria/FilaPublicacion.js';
import Estilos from '../Estilos.js';
import { Typography } from '@material-ui/core';

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
        <div className={classes.fondo}>
            <Typography>{titulo}</Typography>

            <FilaPublicacion tipoPublicacion={tipoPublicacion}/>
            <FilaPublicacion tipoPublicacion={tipoPublicacion}/>
            <FilaPublicacion tipoPublicacion={tipoPublicacion}/>
        </div>
    )
}

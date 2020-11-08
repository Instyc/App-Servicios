import React from 'react';
import {useState} from 'react';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import Estilos from './Estilos.js';

export default function SeleccionarServicio({servicio, agregarSeleccionado}) {
  const classes = Estilos();
  const [hecho_noHecho, setHecho_noHecho] = useState((<div><ClearIcon/></div>));
  const [seleccion, setSeleccion] = useState(servicio.seleccionado);


  React.useEffect(()=>{
    if(servicio.seleccionado===true){
      setSeleccion(true);
      setHecho_noHecho(<div><DoneIcon/></div>);
    }else{
      setSeleccion(false);
      setHecho_noHecho(<div><ClearIcon/></div>);
    }
  },[])

  const handleClick = () => {
    agregarSeleccionado(!seleccion)
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
      <Chip clickable color="primary" label={servicio.nombre} icon={hecho_noHecho} onClick={handleClick}/>
    </div>
  );
}
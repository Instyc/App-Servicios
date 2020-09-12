import React from 'react';
import {useState} from 'react';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import Estilos from './Estilos.js';

export default function SeleccioanrServicio({servicio}) {
  const classes = Estilos();
  const [hecho_noHecho, setHecho_noHecho] = useState((<div><ClearIcon/></div>));
  const [seleccion, setSeleccion] = useState(0);

  const handleClick = () => {
    if(seleccion===1){
      setSeleccion(0);
      setHecho_noHecho(<div><ClearIcon/></div>);
    }else{
      setSeleccion(1);
      setHecho_noHecho(<div><DoneIcon/></div>);
    }
  };

  return (
    <div className={classes.mostrarFlex}>
      <Chip clickable variant="outlined" color="primary" label={servicio} icon={hecho_noHecho} onClick={handleClick}/>
    </div>
  );
}
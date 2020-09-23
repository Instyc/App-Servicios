import React from 'react';
import Filtro from './Filtro.js';
import FilaPublicacion from './FilaPublicacion.js';
import Estilos from '../Estilos.js';

export default function Categoria({tipoPublicacion}) {
    const classes = Estilos();
    return (
        <div className={classes.fondo}>
            <Filtro/>
            <FilaPublicacion tipoPublicacion={tipoPublicacion}/>
            <FilaPublicacion tipoPublicacion={tipoPublicacion}/>
            <FilaPublicacion tipoPublicacion={tipoPublicacion}/>
        </div>
    )
}

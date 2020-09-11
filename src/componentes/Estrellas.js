import React from 'react';
import Rating from '@material-ui/lab/Rating';

import Estilos from './Estilos.js'

export default function Puntuacion() {
    const classes = Estilos();

    return (
        <div className={classes.mostrarFlex}>
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
        </div>
    );
}
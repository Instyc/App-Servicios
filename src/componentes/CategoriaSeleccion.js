import React,{useState} from 'react';

import {Grid, Checkbox, FormControlLabel} from '@material-ui/core';
import SeleccionarServicio from './SeleccionarServicio.js';

const CategoriaSeleccion = ({seleccionado}) => {
    const [arrayServicios, setArrayServicios] = useState(
        [
          {
            label: "Servicio 1"
          },
          {
            label: "Servicio 2"
          },
          {
            label: "Servicio 3"
          },
          {
            label: "Servicio 4"
          },
          {
            label: "Servicio 5"
          },
          {
            label: "Servicio 6"
          }
        ]
      );

    return (
        <div>
            <div hidden={!seleccionado}>
                <Grid  container spacing={2} justify="space-around">    
                    {
                        arrayServicios.map((servicio,i) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                            <SeleccionarServicio key={i} servicio={servicio.nombre} agregarSeleccionado={()=>{}}/>
                        </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    )
}

export default CategoriaSeleccion;
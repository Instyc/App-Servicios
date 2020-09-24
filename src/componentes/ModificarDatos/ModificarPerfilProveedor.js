import React,{useState} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
//import {useDropzone} from 'react-dropzone';
import ImageGallery from 'react-image-gallery';
import SubirImagenes from '../SubirImagen.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SeleccionarServicio from '../SeleccionarServicio.js';

import Estilos from '../Estilos.js';

export default function Registrar() {
    const classes = Estilos();
    const [pictures,setPictures] = useState([]);

    function onDrop(pictureFiles, pictureDataURLs){
        setPictures(pictureFiles);
    }
    
    const images = [
        {
          original: 'https://picsum.photos/id/1018/1000/600/',
          thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1015/1000/600/',
          thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1019/1000/600/',
          thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
      ];

  return (
    <div className= {classes.fondo}>
        <Paper elevation={3} className= {classes.pantallaMedia}>
            <FormControl color="primary" fullWidth>
                <Grid className={classes.filaPublicacion} container direction="row" justify="space-around" alignItems="center" spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h1" align="center">
                            Modificar datos de proveedor
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>    
                        <FormControlLabel
                            className={classes.inputAncho}
                            control={<Checkbox name="checkedA" />}
                            label="Pausar mis servicios"
                        />
                    </Grid>

                    <Grid item xs={12}>    
                        <FormControlLabel
                            className={classes.inputAncho}
                            control={<Checkbox name="checkedA" />}
                            label="Mostrar mi número de teléfono"
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField className={classes.inputAncho} id="filled-basic" label="Descripción" multiline variant="filled" multiline/>
                    </Grid>

                    <Grid item xs={12} className={classes.inputAncho}>
                        <SubirImagenes/>
                    </Grid>

                    <Grid item xs={12} >
                        <Typography variant="h6" component="h3" align="left" className={classes.alinearInputs}>
                            Seleccionar los servicios que ofreces
                        </Typography>
                    </Grid>

                    <Grid item xs={12} >
                        <CategoriaSeleccion/>
                    </Grid>

                    <Grid item xs={6} align="center">
                        <Button size="large" variant="contained" color="primary">Guardar</Button>
                    </Grid>
                    <Grid item xs={6} align="center">
                        <Button size="large" variant="contained" color="secondary">Cancelar</Button>
                    </Grid>
                </Grid>
            </FormControl>
        </Paper>
    </div>
  );
}


const CategoriaSeleccion = () => {
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

    const [seleccionado, setSeleccionado] = useState(false);
    const manejarCambio = () =>{
        setSeleccionado(!seleccionado);
    }

    return (
        <div>
            <Grid container justify="flex-start">
                <FormControlLabel
                    control={<Checkbox onChange={manejarCambio} checked={seleccionado} name="checkedA" />}
                    label="Categoría 1"
                />
            </Grid>

            <div hidden={!seleccionado}>
                <Grid  container spacing={2} justify="space-around">    
                    {
                        arrayServicios.map((servicio,i) => (
                        <Grid item xs={6} sm={4} md={3} lg={2}  key={i} >
                            <SeleccionarServicio key={i} servicio={servicio.label} />
                        </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    )
}

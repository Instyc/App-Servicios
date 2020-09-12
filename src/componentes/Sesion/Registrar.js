import React,{useState} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Estilos from '../Estilos.js';

import SubirImagenes from '../SubirImagen.js';

import ImageUploader from 'react-images-upload';

export default function Registrar() {
    const classes = Estilos();
    const [pictures,setPictures] = useState([]);

    const [soyProveedor,setSoyProveedor] = useState(true);

    function onDrop(pictureFiles, pictureDataURLs){
        setPictures(pictureFiles);
    }


  return (
    <div className={classes.mostrarFlex}>
        <Paper elevation={3} >
            <Grid className={classes.gridRegistro} container justify="space-between" alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1" align="center" className={classes.inputAncho}>
                        Registrar Usuario
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <TextField className={classes.inputAncho} id="filled-basic" label="Nombre" variant="filled" required/>
                </Grid>

                <Grid item xs={6}>
                    <TextField className={classes.inputAncho} id="filled-basic" label="Apellido" variant="filled" required/>
                </Grid>

                <Grid item xs={12}>
                    <ImageUploader
                        withIcon={false}
                        buttonText='Subir imagen del frente y del dorso del DNI'
                        onChange={onDrop}
                        imgExtension={['.jpg ', '.gif ', '.png ', '.gif ']}
                        maxFileSize={5242880}
                        withLabel={false}
                        fileSizeError='El archivo es demasiado grande'
                        fileTypeError='El formato de archivo no es soportado'
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField className={classes.inputAncho} id="filled-basic" label="Correo electrónico" variant="filled" type="email" required/>
                </Grid>

                <Grid item xs={6}>
                    <TextField className={classes.inputAncho} id="filled-basic" label="Usuario" variant="filled" required/>
                </Grid>

                <Grid item xs={6}>
                    <TextField className={classes.inputAncho} id="filled-basic" label="Telefono" variant="filled"/>
                </Grid>
                <Divider/>

                <Grid item xs={6}>
                    <TextField
                        required
                        type="password"
                        label="Contraseña"
                        variant="filled"
                        className={classes.inputAncho}
                    />
                </Grid>

                <Grid item xs={6}> 
                     <TextField
                        required
                        type="password"
                        label="Repetir contraseña"
                        variant="filled"
                        className={classes.inputAncho}
                    />
                </Grid>
                    
                <Grid item xs={12}>
                    <OkProveedor soyProveedor={soyProveedor} setSoyProveedor={setSoyProveedor}/>
                </Grid>

                <div hidden={soyProveedor}>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item xs={6}>
                            <TextField className={classes.inputAncho} id="filled-basic" label="DNI" variant="filled"/>
                        </Grid>
                        
                        <Grid item xs={6}>
                            {/* <ImageUploader
                                className={classes.anchoButton}
                                withIcon={false}
                                buttonText='Subir imagen del frente y del dorso del DNI'
                                onChange={onDrop}
                                imgExtension={['.jpg ', '.gif ', '.png ', '.gif ']}
                                maxFileSize={5242880}
                                withLabel={false}
                                fileSizeError='El archivo es demasiado grande (máx. 5mb)'
                                fileTypeError='El formato de archivo no es soportado'
                            /> */}
                            <SubirImagenes />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField className={classes.inputAncho} id="filled-basic" label="Descripción" variant="filled" multiline/>
                        </Grid>
                    </Grid>
                </div>

                <Grid item xs={12}>
                    <Button className={classes.inputAncho} size="large" variant="contained" color="primary">Registrar Usuario</Button>
                </Grid>
                
                <Grid item xs={12}>
                    <Link href="#">
                        ¿Ya tenes una cuenta?
                    </Link>
                </Grid>
            </Grid>
        </Paper>
    </div>
  );

  function OkProveedor({setSoyProveedor, soyProveedor}) {
    const manejarCambio = (event) => {
      setSoyProveedor(!soyProveedor);
    };
  
    return (
        <FormControlLabel
            control={<Checkbox checked={!soyProveedor} onChange={manejarCambio} name="checkedB" color="primary"/>}
            label="Soy proveedor de servicios"
        />       
    );
  }
}


// function SubirImagenes(props) {
//     const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
//     const files = acceptedFiles.map(file => (
//       <li key={file.path}>
//         {file.path} - {file.size} bytes
//       </li>
//     ));
  
//     return (
//       <section className="container">
//         <div {...getRootProps({className: 'dropzone'})}>
//           <input {...getInputProps()} />
//           <p>Arrastra las imágenes aquí, o clickea para seleccionar los archivos</p>
//         </div>
//         <aside>
//           <h4>Imágenes</h4>
//           <ul>{files}</ul>
//         </aside>
//       </section>
//     );
//   }
  
import React,{useState} from 'react'
//Material-UI
import {Avatar, FormControl, Grid, Typography, TextField, Button, Modal, Fade, Backdrop, InputLabel, MenuItem, Select} from '@material-ui/core/';
import {Mail} from '@material-ui/icons';

///Componentes
import AlertaMensaje from './AlertaMensaje.js';
import Estilos from './Estilos.js';
import CategoriaSeleccion from './CategoriaSeleccion.js';

function ContactarProveedor({esDePerfil}) {
    const classes = Estilos();

    const [seleccionado, setSeleccionado] = useState(false);
    const manejarCambio = () =>{
        setSeleccionado(!seleccionado);
    }

    return (
        <div style={{maxWidth:750}}>
            <Grid  container direction="row" justify="center" alignItems="stretch" spacing={2}>
                <Grid item xs={12}>
                    <div align="center">
                        <Avatar alt="Nombre proveedor" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR7Mt8wp9lo-dd73xpvjzPMcspQ8uwAThLitQ&usqp=CAU" className={classes.imagenPublicacion} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h2" align="center" className={classes.form}>
                        Nombre proveedor
                    </Typography>
                </Grid>
                <FormControl className={classes.inputAncho} style={{marginBottom:10}}>
                  <InputLabel  htmlFor="grouped-select">Seleccione la categoría</InputLabel>
                  <Select defaultValue="" id="grouped-select" onChange={manejarCambio}>
                    <MenuItem value={1}>Option 1</MenuItem>
                    <MenuItem value={2}>Option 2</MenuItem>
                    <MenuItem value={3}>Option 3</MenuItem>
                    <MenuItem value={4}>Option 4</MenuItem>
                  </Select>
                </FormControl>

                <Grid item xs={12}>
                  <CategoriaSeleccion seleccionado={seleccionado}/>
                </Grid>

                <TextField className={classes.inputAncho} id="filled-basic" label="Escribe tu mensaje" variant="filled" multiline/>

                <Grid item>
                  <AlertaMensaje mensaje="¡Mensaje enviado con éxito!"/>
                </Grid>
            </Grid>
        </div>
    )
}

export function BotonContratar({fijo, esDePerfil, datosPerfil}) {
    const classes = Estilos();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
          <div className={fijo?classes.botonFijo:classes.botonNoF}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Mail/>}
              onClick={handleOpen}
            >
              Contactar
            </Button>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.mostrarFlex}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.papelFondo}>
              <ContactarProveedor esDePerfil={esDePerfil}/>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Estrellas from '../Estrellas.js';
import AlertaMensaje from '../AlertaMensaje.js';

import Estilos from '../Estilos.js'

export default function IniciarSesion() {
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
        <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
        >
        Realizar Opinión del Servicio
      </Button>
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
          <div>
            <Grid className={classes.contactarProveedor} container direction="row" justify="space-between" alignItems="center">

                <FormControl >
                    <Typography variant="h4" component="h2" align="center" className={classes.form}>
                        Realizar opinión del servicio
                    </Typography>
                    <TextField className={classes.inputAncho} id="filled-basic" label="Título" variant="filled" required/>
                    <Divider/>
                    
                    <TextField className={classes.inputAncho} id="filled-basic" label="Escribe la reseña del servicio" variant="filled" multiline/>
                    
                    <Typography variant="h5" component="h4" align="center" className={classes.form}>
                        ¡Valora el servicio brindado!
                    </Typography>
                    <Estrellas/>

                    <AlertaMensaje/>
                </FormControl>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
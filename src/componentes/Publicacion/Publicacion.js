import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Mail from '@material-ui/icons/Mail';

import Backdrop from '@material-ui/core/Backdrop';

import ProveedorInfo from './ProveedorInfo.js';
import PublicacionInfo from './PublicacionInfo.js';
import Opiniones from './Opiniones.js';
import Estilos from '../Estilos.js';
import ContactarProveedor from '../ContactarProveedor.js'

export default function Publicacion() {
    return (
        <div>
            <Grid  container direction="row" justify="center" alignItems="stretch">
                <Grid item md={8} xs={12}>
                  <PublicacionInfo/>
                  <Opiniones/>
                </Grid>  
                <Grid item md={4} xs={12} >
                    <ProveedorInfo/>
                </Grid>  
                <BotonContratar/> 
            </Grid>
        </div>
    )
}

/*function Contratar() {
  const classes = Estilos();

  return (
    <div className={classes.botonFijo}>
       <Button
        variant="contained"
        color="primary"
        startIcon={<Mail/>}
      >
        Contactar
      </Button>
    </div>
  );
}*/


function BotonContratar() {
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
        <div className={classes.botonFijo}>
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
          <div className={classes.contactarProveedor}>
            <ContactarProveedor/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
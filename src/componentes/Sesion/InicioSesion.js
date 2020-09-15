import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

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
        Iniciar Sesión
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
          <div className={classes.papelFondo}>
                <FormControl >
                    <Typography variant="h5" component="h1" align="center" className={classes.form}>
                        Iniciar Sesión
                    </Typography>
                    <TextField className={classes.margenArriba} id="filled-basic" label="Usuario/Correo electrónico" variant="filled" required/>
                    <Divider/>
                    <TextField
                        required
                        type="password"
                        label="Contraseña"
                        variant="filled"
                    />
                    
                    <Link className={classes.margenArriba} href="#">
                        Olvidé mi contraseña
                    </Link>
                    
                    <Button className={classes.margenArriba} size="large" variant="contained" color="primary">Iniciar Sesión</Button>

                    <Divider/>
                    <Typography variant="body1" align="center">
                        ¿Sos nuevo acá?|
                        <Link href="#">
                            Crear cuenta
                        </Link>
                    </Typography>
                </FormControl>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
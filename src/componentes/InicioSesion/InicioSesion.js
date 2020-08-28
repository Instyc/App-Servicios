import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "white",
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form:{
      marginBottom: 20
  }
}));

export default function IniciarSesion() {
  const classes = useStyles();
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
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
                <FormControl >
                    <Typography variant="h5" component="h1" align="center" className={classes.form}>
                        Iniciar Sesión
                    </Typography>
                    <TextField className={classes.form} id="filled-basic" label="Usuario/Correo electrónico" variant="filled" required/>
                    <Divider/>
                    <TextField
                        required
                        type="password"
                        label="Contraseña"
                        variant="filled"
                    />
                    
                    <Link className={classes.form} href="#">
                        Olvidé mi contraseña
                    </Link>
                    
                    <Button className={classes.form} variant="contained" color="primary">Iniciar Sesión</Button>

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
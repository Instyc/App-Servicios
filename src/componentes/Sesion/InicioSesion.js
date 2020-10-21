import React, {useContext, useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import LinkMUI from '@material-ui/core/Link';

import {Link} from "react-router-dom";
import Estilos from '../Estilos.js'

import { ObtenerEstadoUsuario, ProveerEstadoUsuario } from '../../Estados/UsuarioEstado'

export default function IniciarSesion({mensaje}) {
  const classes = Estilos();
  const { state, dispatch } = useContext(ObtenerEstadoUsuario);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const iniciarSesion = () => {
    dispatch({type:"setUsuario"});
    console.log(state.tipo)
  };

  return (
    <div>
      <LinkMUI href="#" style={{color:"black",padding: "10px"}} onClick={handleOpen}>
        {mensaje}
      </LinkMUI>
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
                    
                    <LinkMUI className={classes.margenArriba} href="#">
                        Olvidé mi contraseña
                    </LinkMUI>
                    
                    <Button onClick={iniciarSesion} className={classes.margenArriba} size="large" variant="contained" color="primary">Iniciar Sesión</Button>

                    <Divider/>
                    <Typography onClick={handleClose} variant="body1" align="center">
                      {`¿Sos nuevo acá? `}
                      <Link to="/registrar">Crear cuenta</Link>
                    </Typography>
                </FormControl>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
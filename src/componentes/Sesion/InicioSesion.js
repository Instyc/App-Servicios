import React, {useContext, useState} from 'react';
//Material UI 
import {Link as LinkMUI,  LinearProgress, Modal, Backdrop, Fade, Typography, TextField, FormControl, Hidden, Button, Divider, } from '@material-ui/core';

//Librerias
import {Link} from "react-router-dom";
import axios from 'axios'

//
import Estilos from '../Estilos.js'
import { ObtenerEstadoAplicacion } from '../../Estados/AplicacionEstado'

export default function IniciarSesion({mensaje}) {
  const classes = Estilos();
  const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
  const [open, setOpen] = useState(false);
  const [cargando, setcargando] = useState(false);
  const [alerta, setalerta] = useState("");
  const [pwd_olvidada, setpwd_olvidada] = useState(false);

  const [datos, setdatos] = useState({
    email:"",
    contrasena:""
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const cambiarInput = (e) =>{   
    let valor = e.target.value;
    let campo = e.target.name;
    setdatos({
        ...datos,
        [campo]: valor
    })        
  }
  
  const iniciarSesion = () =>{
    setcargando(true)

    if(!pwd_olvidada){
      axios
      .post(state.servidor+"/auth/local/", {
        identifier: datos.email,
        password: datos.contrasena
      })
      .then(response => {
          // Se registró el usuario correctamente
          console.log('Se ha iniciado sesion correctamente.')
          
          dispatch({type:"setDatos", value: response.data.user})
          dispatch({type:"setJwt", value: response.data.jwt})

          localStorage.setItem('datosLocal', JSON.stringify({
            jwt: response.data.jwt,
            datosSesion: response.data.user
          }));

          console.log(response.data.user)

          setcargando(false)
          setOpen(false)
      })
      .catch(error => {
        // Ocurrió un error
        let err = JSON.parse(error.response.request.response).message[0].messages[0].id;
        console.log("Error: ",err)
        
        if(err==="Auth.form.error.invalid")
          setalerta('Correo o contraseña incorrectos');

        setcargando(false)
      });
    }else{
      console.log(datos)
      axios
      .post('http://localhost:1337/auth/forgot-password', {
        email: datos.email,
      },{
        headers:{
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        console.log('Your user received an email', response.data);
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
    }
    
  }

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
                  {pwd_olvidada?"Recuperar contraseña":"Iniciar Sesión"}
                </Typography>
                
                <TextField
                  onChange={cambiarInput}
                  name="email"
                  value={datos.email}
                  className={classes.margenArriba}
                  id="filled-basic"
                  label="Usuario/Correo electrónico"
                  variant="filled"
                  required
                />
                
                <Divider/>
                
                {
                  !pwd_olvidada && <TextField
                    onChange={cambiarInput}
                    name="contrasena"
                    value={datos.contrasena}
                    required
                    type="password"
                    label="Contraseña"
                    variant="filled"
                    style={{marginTop:"15px"}}
                  />
                }

                <Hidden xlDown={mensaje===""}>
                  <Typography color="error">
                      {alerta}
                  </Typography>
                </Hidden>
                
                {
                  !pwd_olvidada && <LinkMUI className={classes.margenArriba} href="#" onClick={()=>{setpwd_olvidada(true)}}>
                    Olvidé mi contraseña
                  </LinkMUI>
                }

                {
                  pwd_olvidada && <LinkMUI className={classes.margenArriba} href="#" onClick={()=>{setpwd_olvidada(false)}}>
                    Cancelar
                  </LinkMUI>
                }
                
                <div className={classes.inputAncho} hidden={!cargando}>
                  <LinearProgress />
                </div>

                <Button
                  onClick={iniciarSesion}
                  className={classes.margenArriba}
                  size="large"
                  variant="contained"
                  color="primary">
                    {
                      !pwd_olvidada?"Iniciar Sesión":"Recuperar"
                    }
                </Button>

                <Divider/>
                
                {
                  !pwd_olvidada && <Typography onClick={handleClose} variant="body1" align="center">
                    {`¿Sos nuevo acá? `}
                    <Link to="/registrar">Crear cuenta</Link>
                  </Typography>
                }
                
            </FormControl>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
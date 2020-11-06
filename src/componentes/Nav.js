import React, {useState, useContext, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
import axios from 'axios'
//Material-UI
import {makeStyles, ListItemIcon, Grid, AppBar, Toolbar, IconButton, Typography, Badge, MenuItem, Menu, Button} from '@material-ui/core/';
import {Chat, AccountCircle, Menu as MenuIcon, Notifications as NotificationsIcon, PriorityHigh as PriorityHighIcon} from '@material-ui/icons'

//Importamos componentes (Logica)
import Inicio from "./Inicio/Inicio.js";
import Publicacion from "./Publicacion/Publicacion.js";
import InicioSesion from "./Sesion/InicioSesion.js";
import Estilos from './Estilos.js';
import NotificacionesNav from './Notificaciones/NotificacionesNav.js';

import { ObtenerEstadoAplicacion } from '../Estados/AplicacionEstado'

export default function PrimarySearchAppBar() {
  const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
  const classes = Estilos();
  let history = useHistory();
  const [despPerf, setdespPerf] = useState(null);
  const [despMenu, setdespMenu] = useState(null);
  const [despNoti, setdespNoti] = useState(null);
  const [traerNotificaciones, settraerNotificaciones] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState(state.datosSesion.tipo);
  const [notificaciones, setnotificaciones] = useState([])
  const [mensajesnoleidos, setmensajesnoleidos] = useState(0)
  
  //Código de guardado del estado de la sesión
  React.useEffect(()=>{
    let sesion = localStorage.getItem('datosLocal') || null;
    let sesionObjeto = JSON.parse(sesion)
    
    if(sesionObjeto!==null){
      dispatch({type:"setDatos", value: sesionObjeto.datosSesion})
      dispatch({type:"setJwt", value: sesionObjeto.jwt})
      let auth = 'Bearer '+sesionObjeto.jwt;
      //dispatch({type:"setDatos", value: sesionObjeto.datosSesion});
      //dispatch({type:"setJwt", value: sesionObjeto.jwt});
      axios
      .get(state.servidor+"/users/"+sesionObjeto.datosSesion.id,{
        headers: {
            'Authorization': auth
        },
      })
      .then(response => {
          // Se registró el usuario correctamente
          console.log('Se ha iniciado sesion correctamente.', response.data)
          dispatch({type:"setDatos", value: response.data})
          dispatch({type:"setJwt", value: sesionObjeto.jwt})
          
          localStorage.setItem('datosLocal', JSON.stringify({
            jwt: sesionObjeto.jwt,
            datosSesion: response.data
          }));
          mensajesNoleidos(sesionObjeto.jwt, response.data)
      })
      .catch(error => {
        console.log("Error: ",error.response)
      });

      axios.get(state.servidor+"/api/notificaciones?receptor="+sesionObjeto.datosSesion.id+"&leido=false",{
        headers: {'Authorization': auth},
      })
      .then(response => {
        console.log(response.data)
        setnotificaciones(response.data.reverse())
      })
      .catch(error => {
        alert("Un error ha ocurrido al buscar las notificaciones.")
        console.log(error.response)
      })
      
    }else{
      dispatch({type:"setPublico", value: true});
    }
  },[])
  
  function mensajesNoleidos(jwt, user){
    let auth = 'Bearer '+jwt;

    
      axios.get(state.servidor+"/api/chats/",{
          headers: {'Authorization': auth},
        })
      .then(response => {
        //Obtenemos todos los chats del sistema y filtramos segun el id de receptor o emisor
        let chats_ = response.data.filter(chat => (chat.receptor.id === user.id || chat.emisor.id === user.id))
        let cantidad = 0
        chats_.map(chat_=>{
          if(chat_.emisor.id===user.id){
            cantidad+= chat_.noleido_emisor
          }

          if(chat_.receptor.id===user.id){
            cantidad+= chat_.noleido_receptor
          }
        })
        
        setmensajesnoleidos(cantidad)
      })
      .catch(error => {
        console.log("Un error ha ocurrido al buscar las notificaciones.")
        console.log(error.response)
      })
    
  }
  
  useEffect(()=>{
    setTipoUsuario(state.datosSesion.tipo)
  },[state.datosSesion.tipo])

  const cerrarSesion = () => {
    setdespPerf(null);
    dispatch({type:"setDatos", value: {
      apellido: "",
      blocked: "",
      confirmed: false,
      created_at: "",
      descripcion: "",
      dni: "",
      email: "",
      estado: false,
      id: null,
      mostrar_telefono: false,
      nombre: "",
      permiso: 0,
      provider: "local",
      role: {
        id: 1, name: "Authenticated", 
        description: "Default role given to authenticated user.", 
        type: "authenticated"
      },
      telefono: "",
      tipo: 0,
      ubicacion: "",
      updated_at: "",
      username: "",
      identidad_verificada: false
    }});
    
    dispatch({type:"setJwt", value: ""});
    dispatch({type:"setPublico", value: true});
    localStorage.setItem('datosLocal', JSON.stringify(null));
    history.push("/")
  };

  const desplegarPerfil = (event) => {
    setdespPerf(event.currentTarget);
  };
  const plegarPerfil = () => {
    setdespPerf(null);
  };
  const desplegarMenu = (event) => {
    setdespMenu(event.currentTarget);
  };
  const plegarMenu = () => {
    setdespMenu(null);
  };
  const desplegarNoti = (event) => {
    settraerNotificaciones(true)
    setdespNoti(event.currentTarget);
  };
  const plegarNoti = () => {
    setdespNoti(null);
  };
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="relative" style={{padding: "0% 7% 0% 7%"}}>
        <Toolbar>          
          <Typography style={{ flexGrow: 1 }} component="h2" variant="h5">
            <Link to="/" style={
              {
              flexGrow: 1,
              textDecoration:"none",
              color: "white",
              
              fontSize: 20,
              }}>
              Servia
            </Link>
          </Typography>
          
          <div>
            <Grid container justify="center" alignContent="center">
              <Grid item>
                <Link to="/" className={classes.botonesNav}>
                  <Button style={{padding:"20px"}}>Explorar servicios</Button>
                </Link>

                {/*<Link to="/proveedores" className={classes.botonesNav}><Button style={{padding:"20px"}}>Proveedores</Button></Link>*/}

                <Link to="/solicitar-servicio" hidden={tipoUsuario!==1} className={tipoUsuario===1?classes.botonesNav:classes.EstiloVacio}>
                  <Button style={{padding:"20px"}}>Solicitar servicio</Button>
                </Link>

                <Link to="/mis-servicios-solicitados" hidden={tipoUsuario!==1} className={tipoUsuario===1?classes.botonesNav:classes.EstiloVacio}>
                  <Button style={{padding:"20px"}}>Mis servicios solicitados</Button>
                </Link>

                <Link to="/categorias-solicitados" hidden={tipoUsuario!==0} className={tipoUsuario!==1?classes.botonesNav:classes.EstiloVacio}>
                  <Button style={{padding:"20px"}}>Servicios solicitados</Button>
                </Link>

                <Link to="/mis-publicaciones" hidden={tipoUsuario!==2} className={tipoUsuario===2?classes.botonesNav:classes.EstiloVacio}>
                  <Button style={{padding:"20px"}}>Mis publicaciones</Button>
                </Link>
                
                <Link to="/crear-publicacion" hidden={tipoUsuario!==2} className={tipoUsuario===2?classes.botonesNav:classes.EstiloVacio}>
                  <Button style={{padding:"20px"}}>Crear publicación</Button>
                </Link>
              </Grid>

                <Grid item hidden={tipoUsuario>0}>
                  <Button style={{margin:10, padding:"8px 0px 8px 0px"}} variant="contained" color="secondary">
                    <InicioSesion mensaje="Iniciar sesión"/>
                  </Button>
                  
                  <Link to="/registrar" className={classes.EstiloPC} style={{textDecoration:"none",color: "black"}}>
                    <Button variant="contained" color="secondary" style={{padding:8}}>
                      Registrar cuenta
                    </Button>
                  </Link>
                </Grid>
            </Grid>
          </div>
         
 
          <div hidden={tipoUsuario===0}>
              {/*Desplegar notificaciones*/}
              <IconButton color="inherit" onClick={desplegarNoti}>
                <Badge badgeContent={notificaciones.length} color="secondary">
                  <NotificationsIcon /> 
                </Badge>
              </IconButton>
              <Menu id="simple-menu" anchorEl={despNoti} keepMounted open={Boolean(despNoti)} onClose={plegarNoti}>
                {
                  traerNotificaciones && <NotificacionesNav notificaciones={notificaciones} plegarNoti={plegarNoti}/>
                }
              </Menu>

              {/*Componente chats*/}
                <Link to="/mis-chats" style={{color:"black"}}>
                  <IconButton color="inherit">
                      <Badge badgeContent={mensajesnoleidos} color="secondary">
                        <Chat />
                      </Badge>
                  </IconButton>
                </Link>
             

              {/*Desplegar perfil*/}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={desplegarPerfil}
              >
              <AccountCircle />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={despPerf}
              keepMounted
              open={Boolean(despPerf)}
              onClose={plegarPerfil}
            >              
              <MenuItem onClick={plegarPerfil}>
                <ListItemIcon>
                  <PriorityHighIcon fontSize="small" />
                </ListItemIcon>
                <Link to="/modificar-usuario" className={classes.EstiloLink}><Typography variant="inherit">Modificar mi perfil</Typography></Link>
              </MenuItem>
              
              <div hidden={tipoUsuario!==2}>
                <MenuItem onClick={plegarPerfil}>
                  <ListItemIcon>
                    <PriorityHighIcon fontSize="small" />
                  </ListItemIcon>
                  <Link to="/modificar-proveedor" className={classes.EstiloLink}><Typography variant="inherit">Modificar mi perfil de proveedor</Typography></Link>
                </MenuItem>
              </div>

              <div hidden={tipoUsuario!==2}>
                <MenuItem onClick={plegarPerfil}>
                  <ListItemIcon>
                    <PriorityHighIcon fontSize="small" />
                  </ListItemIcon>
                  <Link to={"/perfil-proveedor/"+state.datosSesion.id} className={classes.EstiloLink}><Typography variant="inherit">Ver mi perfil de proveedor</Typography></Link>
                </MenuItem>
              </div>

              <div hidden={tipoUsuario!==2 || state.datosSesion.espera_verificacion===true || state.datosSesion.identidad_verificada === true}>
                <MenuItem onClick={plegarPerfil}>
                  <ListItemIcon>
                    <PriorityHighIcon fontSize="small" /> 
                  </ListItemIcon>
                  <Link to={"/verificar-mi-identidad/"} className={classes.EstiloLink}><Typography variant="inherit">Verificar mi identidad</Typography></Link>
                </MenuItem>
              </div>

              <MenuItem onClick={cerrarSesion}>
                <ListItemIcon>
                  <PriorityHighIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Cerrar sesión</Typography>
              </MenuItem>
            </Menu>
          </div>
          
          <div className={tipoUsuario===0?classes.EstiloMovil:classes.EstiloVacio}>
            <IconButton className={classes.hambur} onClick={desplegarMenu}>
              <MenuIcon/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={despMenu}
              keepMounted
              open={Boolean(despMenu)}
              onClose={plegarMenu}
            >
              <Link to="/registrar" hidden={tipoUsuario!==0} className={classes.EstiloLink}>
                <MenuItem onClick={plegarMenu}>Crear una nueva cuenta</MenuItem>
                <hr/>
              </Link>
              
              <Link to="/" className={classes.EstiloMovil} className={classes.EstiloLink}>
                <MenuItem onClick={plegarMenu}>Explorar servicios</MenuItem>
              </Link>
              <Link to="/categorias-solicitados" className={tipoUsuario>=2?classes.EstiloMovil:classes.EstiloVacio}  className={classes.EstiloLink}>
                <MenuItem onClick={plegarMenu}>Servicios solicitados</MenuItem>
              </Link>

              {/*Usuario*/}
              <div hidden={tipoUsuario<1 || tipoUsuario>2}>
                <Link to="/solicitar-servicio" className={tipoUsuario===1?classes.EstiloMovil:classes.EstiloVacio} className={classes.EstiloLink}>
                  <MenuItem onClick={plegarMenu}>Solicitar servicio</MenuItem>
                </Link>
                <Link to="/mis-servicios-solicitados" className={tipoUsuario===1?classes.EstiloMovil:classes.EstiloVacio} className={classes.EstiloLink}>
                  <MenuItem onClick={plegarMenu}>Mis servicios solicitados</MenuItem>
                </Link>
              </div>

              {/*Proveedor*/}
              <div hidden={tipoUsuario!==2}>
                <Link to="/crear-publicacion" className={classes.EstiloMovil} className={classes.EstiloLink}>
                  <MenuItem onClick={plegarMenu}>Crear publicación</MenuItem>
                </Link>
                <Link to="/mis-publicaciones" className={classes.EstiloMovil} className={classes.EstiloLink}>
                  <MenuItem onClick={plegarMenu}>Mis publicaciones</MenuItem>
                </Link>
                <Link to="/chat-contactos" className={classes.EstiloLink}><MenuItem onClick={plegarMenu}>Gestionar contactos (chat)</MenuItem></Link>
              </div>

              {/*Administrador*/}
              <div hidden={tipoUsuario!==3}>
                <Link to="/gestionar-reclamos" className={classes.EstiloLink}><MenuItem onClick={plegarMenu}>Gestionar reclamos</MenuItem></Link>
                <Link to="/verificar-identidad" className={classes.EstiloLink}><MenuItem onClick={plegarMenu}>Verificar identidades </MenuItem></Link>
                <Link to="/administrar-categorias" className={classes.EstiloLink}><MenuItem onClick={plegarMenu}>Administrar categorías </MenuItem></Link>
              </div>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

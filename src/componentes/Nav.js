import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid
} from "@material-ui/core";

//Importamos componentes (Logica)
import Inicio from "./Inicio/Inicio.js";
import Publicacion from "./Publicacion/Publicacion.js";
import InicioSesion from "./Sesion/InicioSesion.js";

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [despPerf, setdespPerf] = React.useState(null);
  const [despMenu, setdespMenu] = React.useState(null);
  const [sesionIniciada, setSesionIniciada] = React.useState(true);

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

  return (
    <div className={classes.grow}>
      <AppBar position="relative">
        <Toolbar>          
            <Typography style={{ flexGrow: 1 }} component="h2" variant="h5">
              <Link to="/" style={
              {
              flexGrow: 1,
              textDecoration:"none",
              color: "white",
              padding:"20px",
              fontSize: 20,
              marginRight:10,
              }}>
              App Servicios
            </Link>
          </Typography>
          
          <div className={classes.EstiloPC}>
          <Grid container justify="center" alignContent="center">
              <Grid item>
                <Link to="/" className={classes.botonesNav}><Button style={{padding:"20px"}}>Publicaciones</Button></Link>
                <Link to="/proveedores" className={classes.botonesNav}><Button style={{padding:"20px"}}>Proveedores</Button></Link>
                <Link to="/categorias-solicitados" className={classes.botonesNav}><Button style={{padding:"20px"}}>Servicios solicitados</Button></Link>            
              </Grid>
              <Grid item hidden={sesionIniciada}>
                <Button style={{margin:10, padding:"8px 0px 8px 0px"}} variant="contained" color="secondary">
                  <InicioSesion mensaje="Iniciar sesión"/>
                </Button>
                
                <Link to="/registrar" style={{textDecoration:"none",color: "black"}}>
                  <Button variant="contained" color="secondary" style={{padding:"8px 8px 8px 8px"}}>
                    Registrar cuenta
                  </Button>
                </Link>
              </Grid>
            
            </Grid>
          </div>  
 
          <div hidden={!sesionIniciada}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
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
                <Link to="/modificar-usuario"><Typography variant="inherit">Modificar perfil</Typography></Link>
              </MenuItem>
              
              <MenuItem onClick={plegarPerfil}>
                <ListItemIcon>
                  <PriorityHighIcon fontSize="small" />
                </ListItemIcon>
                <Link to="/modificar-proveedor"><Typography variant="inherit">Modificar perfil proveedor</Typography></Link>
              </MenuItem>

              <MenuItem onClick={plegarPerfil}>
                <ListItemIcon>
                  <PriorityHighIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Cerrar sesión</Typography>
              </MenuItem>
            </Menu>
          </div>
            
          
          <div className={classes.EstiloMovil}>
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
              <Link to="/publicaciones"><MenuItem onClick={plegarMenu}>Publicaciones</MenuItem></Link>
              <Link to="/proveedores"><MenuItem onClick={plegarMenu}>Proveedores</MenuItem></Link>
              <Link to="/categorias-solicitados"><MenuItem onClick={plegarMenu}>Servicios solicitados</MenuItem></Link>
              <Link to="/solicitar-servicio"><MenuItem onClick={plegarMenu}>Solicitar servicio</MenuItem></Link>
              <Link to="/solicitar-servicio"><MenuItem onClick={plegarMenu}>Mis publicaciones</MenuItem></Link>

              {/*Proveedor*/}
              <Link to="/crear-publicacion"><MenuItem onClick={plegarMenu}>Crear publicación</MenuItem></Link>
              <Link to="/servicios"><MenuItem onClick={plegarMenu}>Gestionar contactos (chat)</MenuItem></Link>
              {/*Administrador*/}
              <Link to="/gestionar-reclamos"><MenuItem onClick={plegarMenu}>Gestionar reclamos</MenuItem></Link>
              <Link to="/verificar-identidad"><MenuItem onClick={plegarMenu}>Verificar identidades </MenuItem></Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  botonesNav:{
    textDecoration:"none",
    color: "white",
    padding:"20px"
  },
  EstiloMovil:{
    display: 'none',
    '@media (max-width:770px)': {
      display: 'inline',
    },
  },
  EstiloPC:{
    display: 'inline',
    '@media (max-width:770px)': {
      display: 'none',
    },
  }
}));
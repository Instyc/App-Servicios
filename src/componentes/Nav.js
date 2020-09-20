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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sesionIniciada, setSesionIniciada] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              background: "red",
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
                <Link to="/solicitados" className={classes.botonesNav}><Button style={{padding:"20px"}}>Servicios solicitados</Button></Link>            
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
              >
              <AccountCircle />
            </IconButton>
          </div>
            
          
          <div className={classes.EstiloMovil}>
            <IconButton className={classes.hambur} onClick={handleClick}>
              <MenuIcon/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Publicaciones</MenuItem>
              <MenuItem onClick={handleClose}>Proveedores</MenuItem>
              <MenuItem onClick={handleClose}>Servicios solicitados</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
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
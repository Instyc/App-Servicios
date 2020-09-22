import React from 'react';
import Nav from './componentes/Nav.js';
import Footer from './componentes/Footer.js';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './App.css';

import Categoria from './componentes/Categoria/Categoria.js';
import Registrar from './componentes/Sesion/Registrar.js';
import InicioSesion from './componentes/Sesion/InicioSesion.js';
import Inicio from './componentes/Inicio/Inicio.js';
import Publicacion from './componentes/Publicacion/Publicacion.js';
import Button from '@material-ui/core/Button';
import ModificarPerfilUsuario from './componentes/ModificarDatos/ModificarPerfilUsuario.js';
import ModificarPerfilProveedor from './componentes/ModificarDatos/ModificarPerfilProveedor';

import CrearPublicacion from './componentes/Publicacion/CrearPublicacion.js';
import GestionarReportes from './componentes/GestionAdministrador/GestionarReportes.js';
import VerificarIdentidad from './componentes/GestionAdministrador/VerificarIdentidad.js';
import PestanaReportes from './componentes/GestionAdministrador/PestanaReportes.js';
import RegistrarSesion from './componentes/Sesion/Registrar.js';

import RealizarOpinion from './componentes/Notificaciones/RealizarOpinion.js';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App() { 
  return (
    <div className="App" style={{height: "auto"}}>
      <Router>
        <Nav/>
        <React.Fragment>
          <CssBaseline/>
          <Container fixed style={{minHeight:"calc(100vh - 130px)"}}>
            <Switch>
              <Route exact path="/" component={Inicio}/>
              <Route path="/crear-publicacion" component={CrearPublicacion}/>
              <Route path="/publicacion" component={Publicacion}/>
              <Route path="/publicaciones" component={Categoria}/>
              <Route path="/registrar" component={RegistrarSesion}/>
              <Route path="/modificar-proveedor" component={ModificarPerfilProveedor}/>
              <Route path="/modificar-usuario" component={ModificarPerfilUsuario}/>
              <Route path="/verificar-identidad" component={VerificarIdentidad}/>
              <Route path="/gestionar-reclamos" component={PestanaReportes}/>
            </Switch>
          </Container>
        </React.Fragment>
        <Footer/>
      </Router>
    </div>
  );
}
export default App;

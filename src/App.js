import React from 'react';
import Nav from './componentes/Nav.js';
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
import CrearPublicacion from './componentes/Publicacion/CrearPublicacion.js';
import GestionarReportes from './componentes/GestionAdministrador/GestionarReportes.js';
import VerificarIdentidad from './componentes/GestionAdministrador/VerificarIdentidad.js';
import PestanaReportes from './componentes/GestionAdministrador/PestanaReportes.js';
import RegistrarSesion from './componentes/Sesion/Registrar.js';

import RealizarOpinion from './componentes/Notificaciones/RealizarOpinion.js';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App() { 
  return (
    <div className="App">
      <Router>
        <Nav/>
        <React.Fragment>
          <CssBaseline/>
          <Container fixed>
            <Switch>
              <Route exact path="/">
                <Inicio/>
              </Route>
              <Route path="/proveedores">

              </Route>
              <Route path="/solicitados">
                <Publicacion/>
              </Route>
              <Route path="/publicaciones">
                <Categoria/>
              </Route>
              <Route path="/registrar">
                <RegistrarSesion/>
              </Route>
            </Switch>
          </Container>
        </React.Fragment>
      </Router>
    </div>
  );
}
export default App;

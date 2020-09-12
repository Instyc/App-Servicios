import React from 'react';
import Nav from './componentes/Nav.js';
import Categoria from './componentes/Categoria/Categoria.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './App.css';
import Registrar from './componentes/Sesion/Registrar.js';
import InicioSesion from './componentes/Sesion/InicioSesion.js';
import Inicio from './componentes/Inicio/Inicio.js';
import Publicacion from './componentes/Publicacion/Publicacion.js';
import ModificarPerfilProveedor from './componentes/ModificarDatos/ModificarPerfilProveedor.js';
import ModificarPerfilUsuario from './componentes/ModificarDatos/ModificarPerfilUsuario.js';

import GestionarReportes from './componentes/GestionAdministrador/GestionarReportes.js';
function App() {
  return (
    <div className="App">
      <Nav/>

      <React.Fragment>
        <CssBaseline />
        <Container fixed maxWidth="xl">
          <GestionarReportes/>
        </Container>
      </React.Fragment>
      
    </div>
  );
}
export default App;

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
function App() {
  return (
    <div className="App">
      <Nav/>

      <React.Fragment>
        <CssBaseline />
        <Container fixed maxWidth="xl">
          <InicioSesion/>
          <Registrar/>
        </Container>
      </React.Fragment>
      
    </div>
  );
}
export default App;

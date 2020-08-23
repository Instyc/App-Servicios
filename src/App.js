import React from 'react';
import Nav from './componentes/Nav.js';
import Inicio from './componentes/Inicio/Inicio.js';
import Categoria from './componentes/Categoria/Categoria.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './App.css';


function App() {
  return (
    <div className="App">
      <Nav/>

      <React.Fragment>
        <CssBaseline />
        <Container fixed maxWidth="xl">
          <Categoria/>
        </Container>
      </React.Fragment>
      
    </div>
  );
}

export default App;

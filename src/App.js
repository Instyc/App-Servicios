import React from 'react';
import './App.css';
//Enrutamiento
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

//Material-UI
import {CssBaseline, Container, Button} from '@material-ui/core/';

//Componentes de vistas
import Nav from './componentes/Nav.js';
import Footer from './componentes/Footer.js';
import Categoria from './componentes/Categoria/Categoria.js';
import Registrar from './componentes/Sesion/Registrar.js';
import InicioSesion from './componentes/Sesion/InicioSesion.js';
import Inicio from './componentes/Inicio/Inicio.js';
import Publicacion from './componentes/Publicacion/Publicacion.js';
import ModificarPerfilProveedor from './componentes/Proveedor/ModificarPerfilProveedor';
import MiPerfil from './componentes/Proveedor/MiPerfil';
import CrearPublicacion from './componentes/Publicacion/CrearPublicacion.js';
import GestionarReportes from './componentes/GestionAdministrador/GestionarReportes.js';
import VerificarIdentidad from './componentes/GestionAdministrador/VerificarIdentidad.js';
import PestanaReportes from './componentes/GestionAdministrador/PestanaReportes.js';
import RegistrarSesion from './componentes/Sesion/Registrar.js';
import MisPublicaciones from './componentes/Publicacion/MisPublicaciones.js';
import PreguntasFrecuentes from './componentes/Footer/PreguntasFrecuentes.js';
import SobreNosotros from './componentes/Footer/SobreNosotros.js';

function App() { 
  return (
    <div className="App" style={{height: "auto"}}>
      <Router>
        <Nav/>
        <React.Fragment>
          <CssBaseline/>
          <Container fixed style={{minHeight:"calc(100vh - 130px)"}}>
            <Switch>
              <Route exact path="/"><Inicio tipo={true}/></Route>
              <Route path="/crear-publicacion"><CrearPublicacion modificar={false} tipoPublicacion={true}/></Route>
              <Route path="/solicitar-servicio"><CrearPublicacion modificar={false} tipoPublicacion={false}/></Route>
              <Route path="/modificar-publicacion"><CrearPublicacion modificar={true} tipoPublicacion={true}/></Route>
              <Route path="/modificar-solicitud-servicio"><CrearPublicacion modificar={true} tipoPublicacion={false}/></Route>
              
              <Route path="/publicaciones"> <Categoria tipoPublicacion={true}/></Route>

              <Route path="/servicios-solicitados"><Categoria tipoPublicacion={false}/></Route>
              <Route path="/categorias-solicitados"><Inicio tipo={false}/></Route>
              
              <Route path="/registrar"><RegistrarSesion registrar={true}/></Route>
              <Route path="/modificar-usuario"><RegistrarSesion registrar={false}/></Route>
              <Route path="/publicacion"><Publicacion/></Route>
              <Route path="/mis-publicaciones"><MisPublicaciones tipoPublicacion={true}/></Route>
              <Route path="/mis-servicios-solicitados"><MisPublicaciones tipoPublicacion={false}/></Route>
              <Route path="/modificar-proveedor"><ModificarPerfilProveedor/></Route>
              <Route path="/verificar-identidad"><VerificarIdentidad/></Route>
              <Route path="/gestionar-reclamos"><PestanaReportes/></Route>
              <Route path="/perfil-proveedor"><MiPerfil/></Route>

              <Route path="/preguntas-frecuentes"><PreguntasFrecuentes/></Route>
              <Route path="/sobre-nosotros"><SobreNosotros/></Route>

            </Switch>
          </Container>
        </React.Fragment>
        <Footer/>
      </Router>
    </div>
  );
}
export default App;

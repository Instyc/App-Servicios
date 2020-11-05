import React, {useContext} from 'react';
import './App.css';
//Enrutamiento
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

//Material-UI
import {CssBaseline, Container} from '@material-ui/core/';

//Componentes de vistas
import Nav from './componentes/Nav.js';
import Footer from './componentes/Footer.js';
import Categoria from './componentes/Categoria/Categoria.js';
import Registrar from './componentes/Sesion/Registrar.js';
import InicioSesion from './componentes/Sesion/InicioSesion.js';
import Inicio from './componentes/Inicio/Inicio.js';
import Publicacion from './componentes/Publicacion/Publicacion.js';
import ModificarPerfilProveedor from './componentes/Proveedor/ModificarPerfilProveedor.js';
import MiPerfil from './componentes/Proveedor/MiPerfil.js';
import CrearPublicacion from './componentes/Publicacion/CrearPublicacion.js';
import GestionarReportes from './componentes/GestionAdministrador/GestionarReportes.js';
import VerificarIdentidad from './componentes/GestionAdministrador/VerificarIdentidad.js';
import PestanaReportes from './componentes/GestionAdministrador/PestanaReportes.js';
import RegistrarSesion from './componentes/Sesion/Registrar.js';
import MisPublicaciones from './componentes/Publicacion/MisPublicaciones.js';
import PreguntasFrecuentes from './componentes/Footer/PreguntasFrecuentes.js';
import SobreNosotros from './componentes/Footer/SobreNosotros.js';
import AdministrarCategorias from './componentes/GestionAdministrador/AdministrarCategorias.js';
import VerificarMiIdentidad from './componentes/Proveedor/VerificarMiIdentidad.js';
import Notificaciones from './componentes/Notificaciones/Notificaciones.js';

import Chat from './componentes/Chat/Chat.js';

import { ObtenerEstado, ProveerEstadoCategoria } from './Estados/CategoriaEstado'
import { ObtenerEstadoAplicacion, ProveerEstadoAplicacion } from './Estados/AplicacionEstado'

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Tema from './Tema'
import TemaClaro from './TemaClaro'

//"typography": {"fontFamily": "['Century Gothic','Roboto','Arial','sans-serif']"}

const theme = createMuiTheme(TemaClaro);

function App() { 
  const { state, dispatch } = useContext(ObtenerEstadoAplicacion);

  return (
    <div className="App" style={{height: "auto"}}>
      <ThemeProvider theme={theme}>
        <Router>
        <ProveerEstadoAplicacion>
          <Nav/>
          
          <React.Fragment>
              <CssBaseline/>
              <Container style={{minHeight:"calc(100vh - 130px)"}}>
                <Switch>
                  
                  <Route exact path="/"><Inicio tipo={true}/></Route>
                  
                  <Route path="/crear-publicacion"><CrearPublicacion modificar={false} tipoPublicacion={true}/></Route>
                  <Route path="/solicitar-servicio"><CrearPublicacion modificar={false} tipoPublicacion={false}/></Route>
                  <Route path="/modificar-publicacion/:id"><CrearPublicacion modificar={true} tipoPublicacion={true}/></Route>
                  <Route path="/modificar-solicitud-servicio/:id"><CrearPublicacion modificar={true} tipoPublicacion={false}/></Route>
                  
                  <Route path="/publicaciones/:id"> <Categoria tipoPublicacion={true}/></Route>

                  <Route path="/servicios-solicitados/:id"><Categoria tipoPublicacion={false}/></Route>
                  <Route path="/categorias-solicitados"><Inicio tipo={false}/></Route>
                  
                  <Route path="/registrar"><RegistrarSesion registrar={true}/></Route>
                  <Route path="/modificar-usuario"><RegistrarSesion registrar={false}/></Route>
                  <Route path="/publicacion/:id"><Publicacion/></Route>
                  <Route path="/mis-publicaciones"><MisPublicaciones tipoPublicacion={true}/></Route>
                  <Route path="/mis-servicios-solicitados"><MisPublicaciones tipoPublicacion={false}/></Route>
                  <Route path="/modificar-proveedor"><ModificarPerfilProveedor/></Route>
                  <Route path="/verificar-identidad"><VerificarIdentidad/></Route>
                  <Route path="/gestionar-reclamos"><PestanaReportes/></Route>
                  <Route path="/verificar-mi-identidad"><VerificarMiIdentidad/></Route>

                  <Route path="/perfil-proveedor/:id"><MiPerfil/></Route>

                  <Route path="/notificaciones"><Notificaciones/></Route>

                  <Route path="/administrar-categorias">
                    <ProveerEstadoCategoria>
                      <AdministrarCategorias/>
                    </ProveerEstadoCategoria>
                  </Route>
                  
                  <Route path="/preguntas-frecuentes"><PreguntasFrecuentes/></Route>
                  <Route path="/sobre-nosotros"><SobreNosotros/></Route>

                  <Route path="/mis-chats"><Chat state={state}/></Route>
                </Switch>
              </Container>
          </React.Fragment>
          <Footer/>
          </ProveerEstadoAplicacion>
        </Router>
      </ThemeProvider>
    </div>
  );
}
export default App;

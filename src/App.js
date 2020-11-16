import React, {useContext, useEffect, useState} from 'react';
import './App.css';
//Enrutamiento
import {BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

//Material-UI
import {CssBaseline} from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

//Componentes de vistas
import Nav from './componentes/Nav.js';
import Footer from './componentes/Footer.js';
import Categoria from './componentes/Categoria/Categoria.js';
import Inicio from './componentes/Inicio/Inicio.js';
import Publicacion from './componentes/Publicacion/Publicacion.js';
import ModificarPerfilProveedor from './componentes/Proveedor/ModificarPerfilProveedor.js';
import MiPerfil from './componentes/Proveedor/MiPerfil.js';
import CrearPublicacion from './componentes/Publicacion/CrearPublicacion.js';
import VerificarIdentidad from './componentes/GestionAdministrador/VerificarIdentidad.js';
import PestanaReportes from './componentes/GestionAdministrador/PestanaReportes.js';
import RegistrarSesion from './componentes/Sesion/Registrar.js';
import MisPublicaciones from './componentes/Publicacion/MisPublicaciones.js';
import PreguntasFrecuentes from './componentes/Footer/PreguntasFrecuentes.js';
import SobreNosotros from './componentes/Footer/SobreNosotros.js';
import VerificarMiIdentidad from './componentes/Proveedor/VerificarMiIdentidad.js';
import Notificaciones from './componentes/Notificaciones/Notificaciones.js';
import Chat from './componentes/Chat/Chat.js';

import { ObtenerEstadoAplicacion } from './Estados/AplicacionEstado'
import TemaServia from './TemaServia'

const theme = createMuiTheme(TemaServia);

function App() { 
  const { state } = useContext(ObtenerEstadoAplicacion);
  const [aux, setaux] = useState(false)
  useEffect(()=>{
    setaux(true)
  },[])

  //Este componente define las rutas de acceso a ciertos componentes de las vistas
  return (
    <div className="App" style={{height: "auto"}}>
      <ThemeProvider theme={theme}>
        <Router>
          <Nav/>
          <React.Fragment>
              <CssBaseline/>
                <div style={{minHeight:"calc(100vh - 130px)"}} className="Fondo">
                  <Switch>
                    <Route exact path={state.ruta+"/"}><Inicio tipo={true}/></Route>
                    <Route path={state.ruta+"/crear-publicacion"}>{aux && state.datosSesion.tipo<2? <Redirect to="/" />:<CrearPublicacion modificar={false} tipoPublicacion={true}/>}</Route>
                    <Route path={state.ruta+"/solicitar-servicio"}>{aux && state.datosSesion.tipo===0? <Redirect to="/" />:<CrearPublicacion modificar={false} tipoPublicacion={false}/>}</Route>
                    <Route path={state.ruta+"/modificar-publicacion/:id"}>{aux && state.datosSesion.tipo<0? <Redirect to="/" />:<CrearPublicacion modificar={true} tipoPublicacion={true}/>}</Route>
                    <Route path={state.ruta+"/modificar-solicitud-servicio/:id"}>{aux && state.datosSesion.tipo===0? <Redirect to="/" />:<CrearPublicacion modificar={true} tipoPublicacion={false}/>}</Route>
                    <Route path={state.ruta+"/publicaciones/:id"}><Categoria/></Route>           
                    <Route path={state.ruta+"/registrar"}>{aux && state.datosSesion.tipo!==0? <Redirect to="/" />:<RegistrarSesion registrar={true}/>}</Route>
                    <Route path={state.ruta+"/modificar-usuario"}>{aux && state.datosSesion.tipo===0?<Redirect to="/"/>:<RegistrarSesion registrar={false}/>}</Route>             
                    <Route path={state.ruta+"/publicacion/:id"}><Publicacion/></Route>
                    <Route path={state.ruta+"/mis-publicaciones"}>{aux && state.datosSesion.tipo<2? <Redirect to="/" />:<MisPublicaciones tipoPublicacion={true}/>}</Route>
                    <Route path={state.ruta+"/mis-servicios-solicitados"}>{aux && state.datosSesion.tipo===0? <Redirect to="/" />:<MisPublicaciones tipoPublicacion={false}/>}</Route>
                    <Route path={state.ruta+"/modificar-proveedor"}>{aux && state.datosSesion.tipo<2? <Redirect to="/" />:<ModificarPerfilProveedor/>}</Route>
                    <Route path={state.ruta+"/verificar-mi-identidad"}>{aux && state.datosSesion.tipo<2?<Redirect to="/" />:<VerificarMiIdentidad/>}</Route>                   
                    <Route path={state.ruta+"/verificar-identidad"}>{aux && state.datosSesion.tipo!==3? <Redirect to="/" />:<VerificarIdentidad/>}</Route>
                    <Route path={state.ruta+"/gestionar-reportes"}>{aux && state.datosSesion.tipo!==3? <Redirect to="/" />:<PestanaReportes/>}</Route>
                    <Route path={state.ruta+"/perfil-proveedor/:id"}><MiPerfil/></Route>
                    <Route path={state.ruta+"/notificaciones"}>{aux && state.datosSesion.tipo===0? <Redirect to="/" />:<Notificaciones/>}</Route>
                    <Route path={state.ruta+"/mis-chats"}>{aux && state.datosSesion.tipo===0? <Redirect to="/" />:<Chat state={state}/>}</Route>
                    <Route path={state.ruta+"/preguntas-frecuentes"}><PreguntasFrecuentes/></Route>
                    <Route path={state.ruta+"/sobre-nosotros"}><SobreNosotros/></Route>

                    {/*<Route path="/administrar-categorias">
                      <ProveerEstadoCategoria>
                        <AdministrarCategorias/>
                      </ProveerEstadoCategoria>
                    </Route>*/}
                </Switch>
              </div>
          </React.Fragment>
          <Footer/>
        </Router>
      </ThemeProvider>
    </div>
  );
}
export default App;

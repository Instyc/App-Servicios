import React,{useContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ObtenerEstadoAplicacion, ProveerEstadoAplicacion } from './Estados/AplicacionEstado'

function Inicial() { 
  const { state, dispatch } = useContext(ObtenerEstadoAplicacion);
  return (
    <ProveerEstadoAplicacion>
      <App/>
    </ProveerEstadoAplicacion>
  )
}
ReactDOM.render(
  /*<React.StrictMode>
    <App />
  </React.StrictMode>*/
  <Inicial/>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

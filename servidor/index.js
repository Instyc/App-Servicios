const express = require('express');
const path = require('path');
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 3001);
//app.set('vistas', path.join(__dirname, '../public/'));

// Middlewares
app.use(express.json());

// Rutas
app.use(require('./Rutas/index.js'));

// Empezamos el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`);
});
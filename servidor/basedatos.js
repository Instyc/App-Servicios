const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'Root',
  password: 'root',
  database: 'AppServicios_BD',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) { 
    console.error(err);
    return;
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = mysqlConnection;
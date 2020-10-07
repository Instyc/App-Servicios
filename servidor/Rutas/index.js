const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../basedatos.js');

// GET all Employees
router.get('/', (req, res) => {
  res.json({"conexion":"exito"})
});

module.exports = router;
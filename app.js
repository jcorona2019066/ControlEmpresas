"use strict"
// variables

const express= require("express");
const app = express();
const bodyParser = require("body-parser");

//Importacion de rutas
var admin_rutas = require("./src/rutas/admin.rutas");
var empresas_rutas = require("./src/rutas/empresas.rutas");

//middlewear
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//aplicacion de rutas
app.use('/api', admin_rutas, empresas_rutas);

//Exportar
module.exports = app; 
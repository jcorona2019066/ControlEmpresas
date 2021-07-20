"use strict"

var express = require("express")
var usuariosControlador = require("../controladores/usuarios.controlador");

var md_autorizacion = require("../middlewares/authenticated");

var app = express.Router();


app.post("/registrarEmpresas",md_autorizacion.ensureAuth,usuariosControlador.registrarEmpresas);
app.put("/editarEmpresas/:id", md_autorizacion.ensureAuth,usuariosControlador.editarEmpresas);
app.delete("/eliminarEmpresas/:id",md_autorizacion.ensureAuth,usuariosControlador.eliminarEmpresas)

module.exports = app;
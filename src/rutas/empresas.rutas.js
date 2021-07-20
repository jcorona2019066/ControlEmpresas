"use strict"

var express = require("express");
var empresasControlador = require("../controladores/empresas.controlador");

var md_autorizacion = require("../middlewares/authenticated");

var app = express.Router();

app.post("/login",empresasControlador.login);
app.put("/crearEmpleado/:idEmpresa",md_autorizacion.ensureAuth,empresasControlador.crearEmpleado);
app.put("/editarEmpleado/:idEmpresa/:idEmpleado",md_autorizacion.ensureAuth, empresasControlador.editarEmpleado)
app.put("/eliminarEmpleado/:idEmpleado",md_autorizacion.ensureAuth, empresasControlador.eliminarEmpleado)

app.get("/obtenerEmpleadosId/:idEmpleado",md_autorizacion.ensureAuth, empresasControlador.obtenerEmpleadosId)

app.get("/obtenerEmpleadosNombre/:nombreEmpleado",md_autorizacion.ensureAuth,empresasControlador.obtenerEmpleadosNombre)
app.get("/obtenerEmpleadosPuesto/:puestoEmpleado",md_autorizacion.ensureAuth,empresasControlador.obtenerEmpleadosPuesto)
app.get("/obtenerEmpleadosDepartamento/:departamentoEmpleado",md_autorizacion.ensureAuth,empresasControlador.obtenerEmpleadosDepartamento)

app.get("/obtenerEmpleados/:idEmpresa",md_autorizacion.ensureAuth,empresasControlador.obtenerEmpleados)


//api.get('/generarPdf/:idEmpresa',md_autorizacion.ensureAuth, empresasControlador.GeneradorDePDF);

module.exports = app;
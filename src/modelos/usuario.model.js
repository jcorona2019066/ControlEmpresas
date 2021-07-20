"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: String,
    apellido: String,
    username: String,
    email: String,
    password: String,
    rol: String,
    puesto: String,
    departamento: String
})
module.exports = mongoose.model("usuarios", UsuarioSchema);
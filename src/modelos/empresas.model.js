"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EmpresasSchema = Schema({
    nombreEmpresa: String,
    password: String,
    empleados:[{
        nombreEmpleado: String,
        emailEmpleado: String,
        puestoEmpleado : String,
        departamentoEmpleado: String,
    }],
    cantidadEmpleado:{
        nuevo: Number,
        despido: Number,
        cantidadActual:[]
    },
    adminEmpresa: {type: Schema.Types.ObjectId, ref:"usuarios"}

})
module.exports = mongoose.model("empresas", EmpresasSchema);
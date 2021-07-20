//importacion
const mongoose = require("mongoose")
const app = require("./app")

const PDF = require("pdfkit")
const fs = require("fs")

var Admin = require("./src/controladores/usuarios.controlador");


mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/dbControlEmpresas3",{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Se encuentra la base de datos");

    Admin.crearAdmin();
    console.log("Se creo Admin");

    app.listen(3000, function(){
        console.log("Servidor activado en 3000");
    })

}).catch(err => console.log(err))
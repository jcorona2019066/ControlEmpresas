"use strict"
var bcrypt = require("bcrypt-nodejs");


var Usuario = require("../modelos/usuario.model");
var Empresas = require("../modelos/empresas.model");

var jwt = require("../servicios/jwt");


function crearAdmin (req , res) {
    var usuarioAdmin = new Usuario();

    usuarioAdmin.nombre = "Jairo",
    usuarioAdmin.apellido = "Corona",
    usuarioAdmin.username = "admin"
    usuarioAdmin.email = "Jcorona@gmail.com",
    usuarioAdmin.password = "123456",
    usuarioAdmin.rol = "ROL_ADMIN",
    usuarioAdmin.puesto = null,
    usuarioAdmin.departamento = null
    

    Usuario.find({ }).exec((err, adminEncontrado) => {
        if (err) return console.log({ mensaje: "error en la peticion del Admin" });
        if (adminEncontrado.length >= 1) {
            return console.log("El ya existe! ");
        } else {
            bcrypt.hash("123456", null, null, (err, passwordEncriptada) => {
                usuarioAdmin.password = passwordEncriptada;

                usuarioAdmin.save((err, adminguardado) => {
                    if (err) return console.log({ mensaje: "Error en la peticion " });

                    if (adminguardado) {
                        console.log("Admin Listo")

                    } else {
                        console.log({ mensaje: "No se pudo registrar" })
                    }

                })
            })

            return console.log({token: jwt.createToken(adminEncontrado)})
               
        }
    })
}

function registrarEmpresas (req, res){
    var empresasModel = Empresas();
    //var adminId = req.user.sub;
    var params = req.body;

  
    empresasModel.nombreEmpresa = params.nombreEmpresa;
    empresasModel.password = params.password;
    empresasModel.cantidadEmpleado ={
        nuevo: 0,
        despido: 0,
        cantidadActual:[]
    }
    //empresasModel.adminEmpresa = req.user.sub
    
    Empresas.find({ 
        $or: [
            {nombreEmpresa: empresasModel.nombreEmpresa},
            {password: empresasModel.password}
        ]
    }).exec((err, empresaEncontrada) => {
        if (err) return console.log({ mensaje: "error en la peticion para registrar empresa" });
        if (empresaEncontrada.length >= 1) {
            return res.status(500).send({ mensaje:"Ya existe la Empresa"});
        }else{
            bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                empresasModel.password = passwordEncriptada;

                empresasModel.save((err, empresaGuardada)=>{
                    if(err) return res.status(500).send({mensaje:"No se pudo guardar la empresa"});
     
                    if(empresaGuardada){
                        res.status(200).send({empresaGuardada})
                    }else{
                        res.status(404).send({mensaje: "No sea podido registrar el usuario"})
                    }
                })
            })  
        }    
    }) 

}


function editarEmpresas (req, res){
    var idEmpresa = req.params.id;
    var params = req.body;
    console.log(idEmpresa);
    console.log(req.user.rol)
    console.log(params)
    delete params.password;
    /* if (req.user.rol !== "ROL_ADMIN"){
        return res.status(500).send({mensaje:"No posee los permisos para editar esta Empresa"})
    }else{ */
        Empresas.findByIdAndUpdate(idEmpresa,params, {new: true},(err, EmpresaActualizada)=>{
        if(err) return res.status(500).send({mensaje:"Error en la peticion"});
        if(!EmpresaActualizada) return res.status(500).send({mensaje:"No se a podido editar la empresa"});
        return res.status(200).send({EmpresaActualizada})
        })
    //}
    
}

function eliminarEmpresas (req, res){
    var empresasModel = Empresas();

    var adminId = req.user.sub;


    var params = req.body
   // console.log(idBase);
    
   /* if(adminRol != "ROL_ADMIN"){
       return res.status(500).send({mensaje:"No son los mismos datos para poder eliminar NO POSEE LOS PERMISOS"});

    }else{  */
        empresasModel.nombreEmpresa = params.nombreEmpresa

        Empresas.findOneAndDelete({ 
            $or: [
                {nombreEmpresa: empresasModel.nombreEmpresa},
            ]
        }).exec(adminId,(err, empresaEliminado)=>{
            if(err) return res.status(500).send({mensaje:"Error en la peticion al eliminar empresa"});
            if(!empresaEliminado) return res.status(500).send({mensaje:"Error en la consulta para eliminar"});
            return res.status(200).send({empresaEliminado});
        })
   // }


    
}

module.exports = {
    crearAdmin,
    registrarEmpresas,
    editarEmpresas,
    eliminarEmpresas
}
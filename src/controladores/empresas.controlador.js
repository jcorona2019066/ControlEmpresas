"use strict"
var bcrypt = require("bcrypt-nodejs");

var Empresas = require("../modelos/empresas.model");


var jwt = require("../servicios/jwt2")

function login(req, res){
    var params = req.body;

    Empresas.findOne({nombreEmpresa: params.nombreEmpresa},(err, empresaEncontrada)=>{
        if (err) return res.status(500).send({mensaje:"Error en la peticion"});
        if (empresaEncontrada){
            bcrypt.compare(params.password,empresaEncontrada.password,(err, passVerificada)=>{
                if(passVerificada){
                    if(params.getToken === "true"){
                        return res.status(200).send({
                            token: jwt.createToken(empresaEncontrada)
                        })
                    }else{
                        empresaEncontrada.password = undefined;
                        return res.status(200).send({empresaEncontrada});
                    }
                }else{
                    return res.status(500).send({mensaje:"La empresa no se a podido identificar"});
                }
            })
        }else{
            return res.status(500).send({mensaje:"Error al iniciar Empresa"});
        }
    })
}

function crearEmpleado(req, res){
    var empresaId = req.params.idEmpresa;
    var params = req.body;


    if(empresaId != req.user.sub){
        return res.status(500).send({mensaje:"Los datos no coinciden o no tiene permiso para crear"})
    }else{
        
        Empresas.findByIdAndUpdate(empresaId, 
            { $push: { empleados: {
                nombreEmpleado: params.nombreEmpleado,
                emailEmpleado: params.emailEmpleado,
                puestoEmpleado: params.puestoEmpleado,
                departamentoEmpleado: params.departamentoEmpleado } } },
            {new: true}, (err, comentarioGuardado)=>{
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion del Comentario en Encuestas' });
            if(!comentarioGuardado) return res.status(500).send({mensaje: 'Error al guardar el comentario'});
    
            
            var conteo = conteo 
            console.log(conteo)         
/*             var nuevos = new Set([conteo]);
            Array.from(nuevos);
            console.log(nuevos); */
            Empresas.findByIdAndUpdate(empresaId,
                { $push: { cantidadEmpleado:{
                    nuevo: 1+conteo,
                    cantidadActual: conteo
            }}}),{new: true}
            console.log(conteo) 
            return res.status(200).send({ comentarioGuardado })



        })
            

    }

    
}

function editarEmpleado(req,res){
    var empleadoId = req.params.idEmpleado;
    var empresaId = req.params.idEmpresa;
    var params = req.body;
    var datosPorActualizar = {}; 

    if(empresaId != req.user.sub){
        return res.status(500).send({mensaje:"Los datos no coinciden o no tiene permiso para editar"})
    }else{ 
        
        if(params.nombreEmpleado) datosPorActualizar['empleados.$.nombreEmpleado'] = params.nombreEmpleado; 
        if(params.emailEmpleado) datosPorActualizar['empleados.$.emailEmpleado'] = params.emailEmpleado; 
        if(params.puestoEmpleado) datosPorActualizar['empleados.$.puestoEmpleado'] = params.puestoEmpleado; 
        if(params.departamentoEmpleado) datosPorActualizar['empleados.$.departamentoEmpleado'] = params.departamentoEmpleado;    

        Empresas.findOneAndUpdate( { _id: empresaId, "empleados._id": empleadoId }, datosPorActualizar,
            {new: true}, (err, empleadoGuardado)=>{
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion del Comentario en Encuestas' });
            if(!empleadoGuardado) return res.status(500).send({mensaje: 'Error al editar el Empleado'});
            return res.status(200).send({ empleadoGuardado })
        })
    }    


}

function eliminarEmpleado (req, res){
    var empleadoId = req.params.idEmpleado;

    Empresas.findOneAndUpdate({ "empleados._id": empleadoId }, { $pull: { empleados: { _id: empleadoId } } }, {new: true},
    (err, empleadoActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de eliminar' });
        if(!empleadoActualizado) return res.status(500).send({ mensaje: 'Error al eliminar el Empleado' });

        return res.status(200).send({ empleadoActualizado })
    })

}

function obtenerEmpleadosId(req, res) {
    var empleadoId = req.params.idEmpleado;

    Empresas.findOne({"empleados._id": empleadoId}, {"empleados.$":1}  ,(err, empleadoEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Empleados'});
        if(!empleadoEncontrado) return res.status(500).send({mensaje: 'Error al obtener Empleados o esta vacio' });

        return res.status(200).send({ empleadoEncontrado });
    })
}

function obtenerEmpleadosNombre(req, res) {
    var empleadoNombre = req.params.nombreEmpleado;

    Empresas.findOne({"empleados.nombreEmpleado": empleadoNombre}, {"empleados.$":1}  ,(err, empleadoEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Empleados'});
        if(!empleadoEncontrado) return res.status(500).send({mensaje: 'Error al obtener Empleados o esta vacio' });

        return res.status(200).send({ empleadoEncontrado });
    })
}

function obtenerEmpleadosPuesto(req, res) {
    var empleadoPuesto = req.params.puestoEmpleado;

    Empresas.findOne({"empleados.puestoEmpleado": empleadoPuesto}, {"empleados.$":1}  ,(err, empleadoEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Empleados'});
        if(!empleadoEncontrado) return res.status(500).send({mensaje: 'Error al obtener Empleados o esta vacio' });

        return res.status(200).send({ empleadoEncontrado });
    })
}

function obtenerEmpleadosDepartamento(req, res) {
    var empleadoDepartamento = req.params.departamentoEmpleado;

    Empresas.findOne({"empleados.departamentoEmpleado": empleadoDepartamento}, {"empleados.$":1}  ,(err, empleadoEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Empleados'});
        if(!empleadoEncontrado) return res.status(500).send({mensaje: 'Error al obtener Empleados o esta vacio' });

        return res.status(200).send({ empleadoEncontrado });
    })
}

function obtenerEmpleados(req, res) {
    var empresaId = req.params.idEmpresa;

    Empresas.findOne({"empleados._id": empresaId}, {"empleados":1 , nombreEmpresa:1},(err, empleadosEncontrados)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Empleados'});
        if(!empleadosEncontrados) return res.status(500).send({mensaje: 'Error al obtener Empleados o esta vacio' });

        return res.status(200).send({ empleadosEncontrados });
    })
}


/* function GeneradorDePDF(req,res){
    var empresaId = req.params.idEmpresa;

    Empresas.findOne({"empleados._id": empresaId}, {"empleados":1 , nombreEmpresa:1},(err, empleadosEncontrados)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Empleados'});
        if(!empleadosEncontrados) return res.status(500).send({mensaje: 'Error al obtener Empleados o esta vacio' });

       
    
      PDFF=empleadosEncontrados
      var doc = new pdf();
      doc.pipe(fs.createWriteStream("./src/pdf/empleados.pdf"));
      doc.text(`Empleados de la Empresa`,{
        align:'center'
      })
      doc.text(PDFF,{
        align: 'left'
      })
      doc.end()
      return res.status(200).send({ empleadosEncontrados });
      return res.status(500).send({mensaje:'PDF exitosamente generado!!'})
    })
} */

/* function GeneradorDePDF(req,res){
    var params = req.body;
    
    if(req.user.rol !='ROL_EMPRESA'){
      return res.status(500).send({mensaje:'No posees los permisos para buscar los empleados'})
    }
    if(params.nombre === req.user.nombre){
      Empleado.find({empresa: req.user.sub}).exec((err,empleadoEncontrado)=>{
        if(err) return res.status(500).send({mensaje:'Error en la petición, obtener datos'})
        if(!empleadoEncontrado) return res.status(500).send({mensaje:'Error al consultar usuarios o no tiene datos'})
      PDFF=empleadoEncontrado
      var doc = new pdf();
      doc.pipe(fs.createWriteStream(`./pdf/empresa ${req.user.nombre}.pdf`));
      doc.text(`Empleados de la Empresa ${req.user.nombre}`,{
        align:'center'
      })
      doc.text(PDFF,{
        align: 'left'
      })
      doc.end()
      })
      return res.status(500).send({mensaje:'PDF exitosamente generado!!'})
    } else{
      return res.status(500).send({mensaje:'No posees los permisos para generar PDF"s de otras empresas'});
    }
  } */

module.exports={
    login,
    crearEmpleado,
    editarEmpleado,
    eliminarEmpleado,
    obtenerEmpleadosId,
    obtenerEmpleadosNombre,
    obtenerEmpleadosPuesto,
    obtenerEmpleadosDepartamento,
    obtenerEmpleados,
   // GeneradorDePDF
}

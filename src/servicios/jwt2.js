"use strict"

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "clave_secreta:IN6AV";

exports.createToken = function(Empresa){
    var payload = {
        sub: Empresa._id,
        nombre: Empresa.nombre,
        iat: moment().unix(),
        exp: moment().day(10, "days").unix()
    }

    return jwt.encode(payload, secret);    
}
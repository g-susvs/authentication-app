const { request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validateJWT = async (req=request, res, next) => {

    const token = req.header("x-token");

    if(!token){
        res.status(404).json({
            msg:"jWT - no hay token en la petición"
        })
    }
    
    const {id} =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    
    const user = await User.findById(id);
    if(!user){
        res.status(404).json({
            msg:"jWT - Usuario no existe"
        })
    }
    if(!user.estado){
        res.status(404).json({
            msg:"JWT - Usuario eliminado"
        })
    }

    req.user = user;
    
    next();

}

module.exports = validateJWT;
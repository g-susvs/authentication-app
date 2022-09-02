const User = require("../models/user");
const Role = require("../models/role");

const emailExits = async (email) => {
    const emailE = await User.findOne({email});
    if(emailE){
        throw new Error('Este email ya esta registrado');
    }
}

const roleExits = async (role)=>{
    const parameter = role;
    if(parameter){
        const roleE = await Role.findOne({role});
        if(!roleE){
            throw new Error('El rol no es valido');
        }
    }
}
const isAdmin = async (req, res, next) => {
    const user = req.user;

    if(user.role != "ADMIN_ROLE"){
        return res.status(400).json({msg:"Usuario requiere rol admin"});
    }
    next();
}

const isValidCollection = (collection) =>{
    const collections = ["users"];
    if(!collections.includes(collection)){
        throw new Error(`La colección ${collection} no es valida`);
    }
    return true;

}
const validFormDataFile = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({msg:"No viene imagen en la petición"});
    }

    next();
}

module.exports = {
    emailExits,
    roleExits,
    isAdmin,
    isValidCollection,
    validFormDataFile
}
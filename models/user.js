const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name:{

        type: String,
        required: [true,'Name is required']
    },
    email:{
        type: String,
        uniq: true,
        required: [true,'Email is required']
    },
    password:{
        type: String,
        required: [true,'Password is required']
    },
    img:{
        type: String,
        default:""
    },
    bio:{
        type: String,
        default:""
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        // required: true
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function(){
    const {__v, password, ...rest} = this.toObject();
    return rest;
}
module.exports =  model('User', UserSchema,'users');
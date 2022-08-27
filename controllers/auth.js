const bcrypt = require('bcryptjs');
const { request } = require('express');

const jwt = require('jsonwebtoken');

const generateJWT = require('../helpers/generate_jwt');
const googleVerify = require('../helpers/google_verify');

const User = require('../models/user');

const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            msg: 'El email no esta registrado'
        });
    }
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            msg: 'Contraseña incorrecta'
        });
    }
    if (!user.estado) {
        return res.status(400).json({
            msg: 'Esta cuenta esta eliminada'
        });
    }

    const token = await generateJWT(user.id);
    
    
    res.status(200).json({
        user,
        token
    })
}

const googleSignIn = async (req, res) => {
    const g_token = req.header("g-token");

    const {name, email, img} = await googleVerify(g_token);
    
    let user = await User.findOne({email});

    if(!user){
        const data = {
            name,
            email,
            password:"...",
            img,
            google: true
        }

        user = new User(data);

        await user.save();
    }
    if(!user.estado){
        return res.status(400).json({
            msg:"La cuenta ha sido eliminada"
        })
    }

    const token = await generateJWT(user.id);

    
    res.status(200).json({
        token
    })

    
}

const renovateJWToken = async (req = request, res) => {
    
    const user = req.user;

    const token = await generateJWT(user._id);
    
    res.status(200).json({
        user,
        token
        }
    )
}

module.exports = {
    login,
    googleSignIn,
    renovateJWToken
}
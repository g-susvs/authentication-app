const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req, res = response) => {

    const query = { estado: true };
    const users = await User.find(query);

    const total = await User.countDocuments(query);

    res.status(200).json({ total, users })
}

const getUser = async (req, res = response) => {

    const { id } = req.params;
    const user = await User.findById(id);
    if (!user.estado) {
        return res.status(404).json({
            msg: 'This user is deleted'
        })
    }

    res.status(200).json(user)
}

const createUser = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;
    
    const user = new User({ name, email, password, role });
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    
    await user.save();
    
    res.status(200).json({
        msg: "Te has registrado"
    });
}

const updateUser = async (req, res = response) => {
    const { id } = req.params;
    const { _id, email, role, ...rest } = req.body;

    if(rest.password){
        const salt = bcrypt.genSaltSync(10);
        rest.password = bcrypt.hashSync(rest.password, salt);
    }
    
    const user = await User.findByIdAndUpdate(id, rest, { new: true });

    res.status(200).json(user);
}

const deleteUser = async (req, res = response) => {
    const { id } = req.params;
   
    await User.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.status(200).json({
        msg: 'User deleted',
        
    })
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
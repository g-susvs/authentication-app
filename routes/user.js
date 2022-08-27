const { Router } = require('express');
const { check } = require('express-validator');
const {validateFields} = require('../middlewares/validate_fields');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/user');
const { emailExits, roleExits, isAdmin } = require('../middlewares/db_validators');
const validateJWT = require('../middlewares/validate_jwt');

const router = Router();

router.get('/', getUsers);

router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    validateFields
],getUser);

router.post('/', [
    check('name','Name is required').notEmpty(),
    check('email','Email is required').isEmail(),
    check('email').custom(emailExits),
    check('password','Password is required').isLength({min:6}),
    check('role').custom(roleExits),
    validateFields
], createUser);

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    validateFields
],updateUser);

router.delete('/:id',[
    validateJWT,
    check('id','No es un id valido').isMongoId(),
    isAdmin,
    validateFields
],deleteUser);

module.exports = router
const {Router} = require('express');
const {check} = require('express-validator');
const { login, googleSignIn, renovateJWToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate_fields');
const validateJWT = require('../middlewares/validate_jwt');

const router = Router();

router.post('/login',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña debe tener un minimo de 6 caracteres').isLength({min:6}),
    validateFields
],login);
router.post('/google', googleSignIn);

router.get('/',[
    validateJWT,
    validateFields
],renovateJWToken);

module.exports = router;
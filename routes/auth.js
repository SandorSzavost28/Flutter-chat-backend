/*
    path: api/login

*/


//creacion de rutas en la app
const{ Router }= require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


//clase
const router = Router();

//configuracion de rutas
router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contrasena es obligatoria').not().isEmpty(),
    validarCampos
],crearUsuario);

//crear nueva ruta 
//validar  email , pass
router.post('/', [
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contrasena es obligatoria').not().isEmpty(),
    validarCampos
], login );


//renewToken requiere un token para renovarlo, se crea nuevo middelware, validar-jwt.js
router.get('/renew', validarJWT ,renewToken );


//exportar
module.exports = router;
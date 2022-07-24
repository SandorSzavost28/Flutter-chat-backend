//ruta para manejar usuarios
/*
    path: api/usuarios

*/

//creacion de rutas en la app
const{ Router }= require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

//importamos para el getUsuarios
const { getUsuarios } = require('../controllers/usuarios');

//clase
const router = Router();

//renewToken requiere un token para renovarlo, se crea nuevo middelware, validar-jwt.js api/usuarios
router.get('/', validarJWT , getUsuarios );


//exportar
module.exports = router;
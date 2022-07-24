/*
    Path: /api/mensjaes

*/

//necesitamos validar Token, con eso tnemos le ID de la persona quie hace la solicitud y la sala de chat



//creacion de rutas en la app
const{ Router }= require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');

//clase
const router = Router();

//renewToken requiere un token para renovarlo, se crea nuevo middelware, validar-jwt.js api/usuarios
//de que persona necesito cargar los mensajes
router.get('/:de', validarJWT , obtenerChat  );


//exportar
module.exports = router;
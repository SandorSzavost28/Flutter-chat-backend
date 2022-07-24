const jwt = require('jsonwebtoken');

//funcion para validar
const validarJWT = ( req, res, next ) => {

    //leer el token
    const token = req.header('x-token');

    //validacion
    //sino hay token no continua
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    
    //validar el token
    try {
        //extraer uid
        const { uid } = jwt.verify( token , process.env.JWT_KEY );
        req.uid = uid;

        next();
    } catch (error){
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }


    // console.log(token);

    // next();

}

module.exports = {
    validarJWT
}
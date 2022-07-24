const jwt = require('jsonwebtoken');

//funcion
const generarJWT = ( uid )=>{

   return new Promise( (resolve, reject) => {

         //recibir uid

         const payload = {
            uid
         }

        jwt.sign( payload , process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {

            if ( err) {
                //no se pudo crear el token
                reject('No se pudo generar el JWT');
            } else {
                //TOKEN
                resolve(token);
            }

        } )

   });

}


const comprobarJWT = ( token = '' )  => {

    //validar el token
    try {
        //extraer uid
        const { uid } = jwt.verify( token , process.env.JWT_KEY );
        
        
        //tenemos que regresar 2 cosas, true si es correcto, y el uid del usuario
        return [ true , uid];

    } catch (error){
        return [ false , null ];
    }

}

module.exports = {
    generarJWT, 
    comprobarJWT
}
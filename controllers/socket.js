//importamos el modelo Usuario, ya viene con Mongoogse
const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

//CORRECCIONES EN CLASE 109 MEJORA AL CODIGO
//funcion que se ejecutara al conectarse un usuario
const usuarioConectado = async (uid = "") => {
    //asignamos a la variable update
    const update = { online: true };
    //usando Mongoose "Usuario" para trabajar con la BDD con esto tenemos acceso a toda la info del usuario
    //buscamos por uid y actualizamos por medio de update
    await Usuario.findByIdAndUpdate(uid, update);
    // Para ver los cambios realizados
    const usuario = await Usuario.findById(uid); 
    //impresion en pantalla
    //console.log("Autenticado:", usuario);
    //devolvemos usuario conectado
    return usuario;
};


const usuarioDesconectado = async (uid = "") => {
    //asignamos a la variable update
    const update = { online: false };
    //buscamos por uid y actualizamos por medio de update
    await Usuario.findByIdAndUpdate(uid, update);
    // Para ver los cambios realizados 
    const usuario = await Usuario.findById(uid);
    //impresion en pantalla
    //console.log("Desautenticado:", usuario);
    //devolvemos usuario desconectado
    return usuario;
};

const grabarMensaje = async( payload ) => {

    /*
        payload: {
            de: '',
            para: '',
            texto: '',
        }

    */

    //dentro de try/catch por si falla
    try{
        //instanacia de mensaje
        const mensaje = new Mensaje( payload )
        await mensaje.save();


        return true; //regresa esto si se ejeccuta
    } catch(error){
        return false;
    }
}


//exportaciones
module.exports={
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje

}


// //funcion que se ejecutara al conectarse un usuario
// const usuarioConectado = (uid = '')=>{
//     //usando Mongoose para trabajar con la BDD con esto tenemos acceso a toda la info del usuario
//     const usuario = Usuario.findById( uid );
//     //actualizamos online
//     //usuario.online = true;
//     const update = {online: true}
//     //grabamos en la BDD
//     await usuario.save();
//     //regresamos el usuario conectado
//     return usuario;
// }

// //funcion que se ejecutara al desconectarse un usuario
// const usuarioDesonectado = (uid = '')=>{
//     //usando Mongoose para trabajar con la BDD con esto tenemos acceso a toda la info del usuario
//     const usuario = Usuario.findById( uid );
//     //actualizamos online
//     usuario.online = false;
//     //grabamos en la BDD
//     await usuario.save();
//     //regresamos el usiario desconectadp
//     return usuario;
// }

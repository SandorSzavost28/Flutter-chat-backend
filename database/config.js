//importarciones
const mongoose = require('mongoose');


//función para hacer la conexion
const dbConnection = async()=>{

    //try catch para saber si hay error
    try {

        // console.log('init db config')
        //conexion a la bdd (cadena de coneccion en los environments)
        await mongoose.connect( process.env.DB_CNN);

        console.log('DB Online');
    
    } catch{
        console.log(error); //si hay herror lo imprime en consola
        throw new Error('Error al conectar  a Database, llamar a administrador y (Verificar si la IP tiene acceso en MongoDB Atlas)');
    }

}

//exportar funcion para hacerla disponible
module.exports = {
    dbConnection
}

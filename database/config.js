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
        console.log(error);
        throw new Error('Error en la base de datos, llamar a administrador');
    }



}

//exportar funcion
module.exports = {
    dbConnection
}

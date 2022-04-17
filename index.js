const express = require('express');
const path = require('path');
//varriables de entorno
require('dotenv').config();


// DB Config
require('./database/config').dbConnection();

//App de Express
const app = express();

//recibir info de un POST
//informacion del body de un HTTP
//Lectura y parseo del body( body es lo que viene eun una peticion HTTP puede ser POST DELETE ETC)
app.use(express.json());


//Creacion de Servidor Node
const server = require('http').createServer(app); //enviamos la app como argumento
module.exports.io = require('socket.io')(server);

require('./sockets/socket');


//path publico o carpeta publica
const publicPath = path.resolve( __dirname, 'public')
app.use( express.static(publicPath) );

//mis rutas
app.use('/api/login', require('./routes/auth'));


server.listen( process.env.PORT , ( err ) => {
    //si error
    if (err) throw new Error(err);
    //si todo bien
    console.log('Servidor corriendo en puerto!!!', process.env.PORT )
})
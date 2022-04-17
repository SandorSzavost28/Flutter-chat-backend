
const{io} = require('../index');

//mensajes de sockets
io.on('connection', client => {
    console.log('Cliente Conectado');

    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });




     //mensajhe inicial

    // //escuchando //es lo que hara cuando llame al evento 'mensaje'
    // client.on('mensaje',( payload )=>{
    //     console.log('Recibi un mensaje de un Cliente!!', payload );

    //     //es lo que hara el servidor como respuesta al mensaje del cliente
    //     //mensaje a todos los clientes conectados
    //     io.emit('mensaje',{admin: 'Nuevo mensaje del servidor'} ) ;

    // });


  });
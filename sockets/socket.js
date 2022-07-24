
const{ io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const{ usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

//mensajes de sockets
io.on('connection', (client) => {
    //aparece en consola del servidor
    console.log('Cliente Conectado'); 

    //Verificacion de cliente con Token????Z
    //console.log( client.handshake.headers['x-token'] );

    const [valido, uid] = comprobarJWT( client.handshake.headers['x-token'] )

    //Imprime si es valido el JTW y el UID de usuario
    //console.log(valido,uid);

    //validacion si no es valido el JWT lo desconecta
    if ( !valido ) { return client.disconnect();}
    
    //si llego aqui es que esta autenticado
    console.log('Cliente Autenticado')

    //cliente autenticado
    usuarioConectado( uid );

    //  ingresar al nuestro usuario a una sala especifica
    // sala global / sala id client.id / sala uid
    client.join( uid );

    //mensaje para a traves del servidor
    client.on('mensaje-personal', async ( payload ) => {
      //imprimimos en consola mensaje de emisor
      //console.log(payload);

      //TODO: Grabar mensaje en la BDD
      await grabarMensaje(payload);

      
      //enviar mensaje al usuario destinatario, solo a la persona que tiene el uid
      io.to( payload.para ).emit( 'mensaje-personal', payload );


    });

    
    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
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
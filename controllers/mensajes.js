//importar modelo de mensaje
const Mensaje = require('../models/mensaje');

//funciona para retornar los mensajes
const obtenerChat = async( req, res) => {

    //necesito saber mi id
    const miId = req.uid;
    
    //necesito mensaje de>
    const mensajesDe = req.params.de;

    //cargar los ultimos 30 mensajes
    const last30 = await Mensaje.find({
        $or : [{ de: miId, para: mensajesDe}, {de: mensajesDe, para: miId}]
    })
    .sort({ createdAt: 'desc'})
    .limit(30);

    res.json({
        ok: true,
        mensajes: last30
    });


}


module.exports = {
    obtenerChat
}
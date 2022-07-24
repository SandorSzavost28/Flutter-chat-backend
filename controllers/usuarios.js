const { response } = require("express");
const Usuario = require('../models/usuario');

const getUsuarios = async(req, res = response) => {

    //paginaciones
    const desde = Number ( req.query.desde ) || 0;

    //creamos consntante usuarios con - para hacerlo descendente
    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } } ) //agregamos todos menos el id del que estoy conectado
        .sort('-online')
        .skip(desde) //paginacion
        .limit(20)
    //tarea
    res.json({
        ok: true,
        usuarios
    })


}

module.exports = {
    getUsuarios
}
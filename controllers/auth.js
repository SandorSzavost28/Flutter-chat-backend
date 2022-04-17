const{response} = require('express');
// const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
// const res = require('express/lib/response');
const usuario = require('../models/usuario');

//funcion
const crearUsuario = async (req,res = response) => {

        //extraer la info que necesito del body, emial
        const { email, password } = req.body;

        //confirma si existe en la bdd, dentro de un try catch por si hay errores
        try{
            //indicar como manejar la excepcion
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya está registrado'
                });
            }
           
            const usuario = new Usuario( req.body );

            //encriptar antes de grabar
            //genera aleatorios
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt);

            //grabar en la bdd
            await usuario.save();

            //Generar JWT en archivo aparte
            const token = await generarJWT( usuario.id );

            //respuesta
            res.json({
                ok: true,
                usuario,
                token
            });

        } catch (error){
            //imprime el error
            console.log(error);
            //retornanr mensaje para avisar
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });

        }
   
};

const login = async (req, res = response) => {

    const { email, password } = req.body;

    // dentro de la comunic entre la BDD sera un try catch por si hay un error
    try {

        const usuarioDB = await Usuario.findOne({email});
        //sino se llega aencontrar
        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //validar password
        const validPassword = bcrypt.compareSync (password, usuarioDB.password);
        //sino es la misma
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        //si llegamos hasta aqui significa que fue correcta la validacion
        //Generar JWT
        const token = await generarJWT(usuarioDB.id);

        //respuesta
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }

}

const renewToken = async ( req, res = response ) => {

    // //const uid uid del usuario
    const uid = req.uid;
    // //generar nuevo JWT, generarJWT uid
    const token = await generarJWT( uid );
    // //obtener usuario oir uid Usuario.findById
    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        usuario,
        token
    });


    // res.json({
    //     ok: true,
    //     uid: req.uid
    // });
}


module.exports = {
    crearUsuario, login, renewToken
}
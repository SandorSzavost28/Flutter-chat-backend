const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true,
    },
    online:{
        type: Boolean,
        default: false,
    },
    
});

//rescribios el metodo toJSON para dejar fuera el password
UsuarioSchema.method('toJSON',function(){
    //es la instancia del objeto creado, que contiene toda la info, y extraemos lo que no queremos
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object; //contiene todas las propiedades a excepcion de las que removimos arriba
});

module.exports = model('Usuario', UsuarioSchema );
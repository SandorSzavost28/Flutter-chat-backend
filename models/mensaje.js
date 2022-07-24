const {Schema, model} = require('mongoose');

const MensajeSchema = Schema({

    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    mensaje: {
        type: String,
        required: true
    }
    
    
},{
    timestamps: true
});

//rescribios el metodo toJSON para dejar fuera el password
MensajeSchema.method('toJSON',function(){
    //es la instancia del objeto creado, que contiene toda la info, y extraemos lo que no queremos
    const {__v, _id, ...object} = this.toObject();
    return object; //contiene todas las propiedades a excepcion de las que removimos arriba
});

module.exports = model('Mensaje', MensajeSchema );
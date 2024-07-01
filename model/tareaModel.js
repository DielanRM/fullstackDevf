const mongoose = require('mongoose')

tareaSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, //pide el Id de un usuario que exista (aqui estaria uniendo las 2 tablas)
        require: true,
        ref: 'User'
    },
    texto: {
        type: String,
        required: [true, 'por favor teclea el texto de la tarea a realizar']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Tarea', tareaSchema)
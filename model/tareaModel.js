const mongoose = require('mongoose')

tareaSchema = mongoose.Schema({
    texto: {
        type: String,
        required: [true, 'por favor teclea el texto de la tarea a realizar']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Tarea', tareaSchema)
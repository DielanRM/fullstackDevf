const mongoose = require('mongoose')

userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'por favor teclea tu nombre']
    },
    email: {
        type: String,
        required: [true, 'por favor teclea tu mail'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'por favor teclea tu password']
    },
    esAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
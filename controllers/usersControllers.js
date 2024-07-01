const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const login = (req, res)=>{
    res.status(200).json({message: 'login'})
}

const register = asyncHandler(async(req, res)=>{
    const {nombre, email, password } = req.body //destructuracion

    if(!nombre || !email || !password){
        res.status(400)
        throw new Error('Por favor proporciona todos los datos')
    }

    //verificar que el usuario no exista
    const userExiste = await User.findOne({email})
    if(userExiste){
        res.status(400)
        throw new Error('Ya cuentas con una cuenta') 
    }else{
        //hash al password
        const salt = await bcrypt.genSalt(10) //crea mas datos aleatorios con el fin de que aun 2 contrasenas iguales no tengan el mismo hash
        const hashedPassword = await bcrypt.hash(password, salt) //crea el hash al password 
    
        //creacion del usuario
        const user = await User.create({
            nombre,
            email,
            password: hashedPassword
        })
        if(user){
            res.status(201).json({
                _id: user.id,
                nombre: user.nombre,
                email: user.email
            })
        }else{
            res.status(400)
            throw new Error('datos incorrectos')
        }
    }
})

const data = (req, res)=>{
    res.status(200).json({message: 'data'})
}

module.exports = {
    login,
    register,
    data
}
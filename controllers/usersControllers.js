const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const login = asyncHandler(async(req, res)=>{
    const { email, password} = req.body

//verifica que el usuario exista
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            nombre: user.nombre,
            email: user.email,
            token: generarToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error ('credenciales incorrectas')
    }
})

//Generar token
const generarToken = (idUsuario) => {
    return jwt.sign({idUsuario}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
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
    res.status(200).json(req.user)
}

module.exports = {
    login,
    register,
    data
}
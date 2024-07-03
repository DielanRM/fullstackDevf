const jwt = require ('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User =require ('../model/userModel')


const protect = asyncHandler(async(req, res, next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        try {
            //obtener el token
            token = req.headers.authorization.split(' ')[1] //convertira el token en un array

            //verificacion del token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtener los datos del usuario
            req.user = await User.findById(decoded.idUsuario).select('-password') //pasa el id menos el password

            next()
        } catch (error) {
            console.error(error);
            res.status(401)
            throw new Error ('acceso no autorizado')
        }

        if(!token){  //si no hay un token
            res.status(401)
            throw new Error ('np se proporciono un token')
        }
})

module.exports = {
    protect
}


const asyncHandler = require('express-async-handler') //el asyncHandler haria de try, catch. asyncHandler es una libreria de express
const Tarea = require('../model/tareaModel.js')


const getTareas = asyncHandler(async (req, res)=>{
    const tareas = await Tarea.find()
    res.status(200).json(tareas)
})


const crearTareas = asyncHandler(async (req, res)=>{
    if(!req.body.texto){
        res.status(400)
        throw new Error('favor de poner un texto')//lanza un error de una forma mas tecnica, mejor que el .json(msg:'etc)
    }

    const tarea = await Tarea.create({
        texto: req.body.texto //req =es la peticion, body = la info se esta pasando atraves del body, texto = es el atributo que yo le di en el model
    })

    res.status(201).json(tarea)
})


const updateTareas = asyncHandler(async (req, res)=>{
    const tarea = await Tarea.findById(req.params.id)// es params porque se el dato viene desde la url, y es Id porque asi lo defini en las rutas en la parte de "router.put('/:id', updateTareas)"

    if(!tarea){
        res.status(400)
        throw new Error ('Trea no encontrada')
    }else{
        const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true})//lo primero es de donde viene la info, 2.- lo que se va a modificar 3.- devolvera la tarea ya modificada, si fuera "false" la devuelve antes de ser modificada
        res.status(200).json(tareaUpdated)
    }
})


const deleteTareas = asyncHandler(async (req, res)=>{
    const tarea = await Tarea.findById(req.params.id)// es params porque se el dato viene desde la url, y es Id porque asi lo defini en las rutas en la parte de "router.put('/:id', updateTareas)"

    if(!tarea){
        res.status(400)
        throw new Error ('Trea no encontrada')
    }else{
        await tarea.deleteOne()
        res.status(200).json({id: req.params.id})
    }
})

module.exports = {
    getTareas,
    crearTareas,
    updateTareas,
    deleteTareas
}
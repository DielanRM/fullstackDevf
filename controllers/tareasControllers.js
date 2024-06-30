const getTareas = (req, res)=>{
    res.status(200).json({message: 'getTareas'})
}

const crearTareas = (req, res)=>{
    if(!req.body.texto){
        res.status(400)
        throw new Error('favor de poner un texto')//lanza un error de una forma mas tecnica, mejor que el .json(msg:'etc)
    }

    res.status(201).json({message: 'crearTareas'})
}

const updateTareas = (req, res)=>{
    res.status(200).json({message: `Modificar la tarea ${req.params.id}`})
}

const deleteTareas = (req, res)=>{
    res.status(200).json({message: `eliminar la tarea ${req.params.id}`})
}

module.exports = {
    getTareas,
    crearTareas,
    updateTareas,
    deleteTareas
}
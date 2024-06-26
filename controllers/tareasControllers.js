const getTareas = (req, res)=>{
    res.status(200).json({message: 'getTareas'})
}

const crearTareas = (req, res)=>{
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
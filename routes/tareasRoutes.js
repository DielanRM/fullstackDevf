const express = require('express')
const router = express.Router()
const {getTareas, crearTareas, deleteTareas, updateTareas} = require('../controllers/tareasControllers')


router.get('/', getTareas)
router.post('/', crearTareas)

router.put('/:id', updateTareas)
router.delete('/:id', deleteTareas)

module.exports = router

const express = require('express')
const router = express.Router()
const {getTareas, crearTareas, deleteTareas, updateTareas} = require('../controllers/tareasControllers')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getTareas)
router.post('/', protect, crearTareas)

router.put('/:id', protect, updateTareas)
router.delete('/:id', protect, deleteTareas)

module.exports = router


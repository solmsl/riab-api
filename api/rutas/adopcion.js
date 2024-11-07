const express = require('express');
const router = express.Router();

//importamos el controlador
const adopController = require('../controllers/adopcionesController');

/**rutas con middleware */
router.get('/', adopController.obtenerTodos);
router.delete('/:id_adopcion', adopController.borrar);
router.post('/crear', adopController.crear);

module.exports = router
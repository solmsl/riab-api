const express = require('express');
const router = express.Router();

//Importamos controlador
const controladorMascota = require('../controllers/mascotasController')

//Importamos middleware
const verificarToken = require('../middlewares/auth');

// localhost:3000/mascotas/
router.get('/', verificarToken,controladorMascota.obtenerMascotas);
router.get("/obtenerId/:id", verificarToken, controladorMascota.obtenerMascotasId);
router.post('/registro', controladorMascota.crearMascotas);
router.put('/:id', verificarToken, controladorMascota.actualizarMascotas);
router.delete('/:id', verificarToken, controladorMascota.borrarMascotas);

module.exports = router
const express = require('express');
const router = express.Router();

//Importamos controlador
const controladorMascota = require('../controllers/mascotasController')

// localhost:3000/mascotas/
router.get('/', controladorMascota.getAllMascotas);
router.get("/:id", controladorMascota.getMascotaById);
router.post('/registro', controladorMascota.crearMascotas);
router.put('/:id', controladorMascota.actualizarMascota);
router.delete('/:id', controladorMascota.eliminarMascota);

module.exports = router
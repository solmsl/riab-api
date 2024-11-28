const express = require('express');
const router = express.Router();
//importamos middleware multer
const upload = require('../middleware/multer');
//Importamos controlador
const controladorMascota = require('../controllers/mascotasController')

// localhost:3000/mascotas/
router.get('/', controladorMascota.getAllMascotas);
router.get('/:id', controladorMascota.getMascotaById);
router.post('/registro',upload.single('image'), controladorMascota.crearMascotas);
router.put('/:id', controladorMascota.actualizarMascota);
router.delete('/:id', controladorMascota.eliminarMascota);

module.exports = router
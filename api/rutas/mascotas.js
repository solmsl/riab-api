const express = require('express');
const router = express.Router();
// const upload=require('../middlewares/multer');
const { upload, uploadToCloudinary } = require('../middlewares/multer');

//Importamos controlador
const controladorMascota = require('../controllers/mascotasController')

// const multerUpload = require('../middlewares/multer');

// localhost:3000/mascotas/
router.get('/', controladorMascota.getAllMascotas);
router.get('/:id', controladorMascota.getMascotaById);
router.post('/registro', upload.single('imagen'), uploadToCloudinary, controladorMascota.crearMascotas);
router.put('/:id', controladorMascota.actualizarMascota);
router.delete('/:id', controladorMascota.eliminarMascota);

module.exports = router
const express = require('express');
const router = express.Router();
const upload=require('../middlewares/multer');
//Importamos controlador
const controladorMascota = require('../controllers/mascotasController')
// import {multerUpload} from '../middlewares/multer'

const multerUpload = require('../middlewares/multer');
// localhost:3000/mascotas/
router.get('/', controladorMascota.getAllMascotas);
router.get('/:id', controladorMascota.getMascotaById);
router.post('/registro',upload.single('file'), controladorMascota.crearMascotas);
router.put('/:id', controladorMascota.actualizarMascota);
router.delete('/:id', controladorMascota.eliminarMascota);

module.exports = router
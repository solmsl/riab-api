const { body, validationResult } = require('express-validator');
const mascotas = require('../models/modelMascotas');
// import fs from 'fs';
const fs = require('fs');

// Validaciones para crear y actualizar una mascota
const validarMascota = [
  body('nombreApodo').notEmpty().withMessage('El nombre o apodo es requerido.'),
  body('especie').notEmpty().withMessage('La especie es requerida.'),
  body('raza').notEmpty().withMessage('La raza es requerida.'),
  body('color').notEmpty().withMessage('El color es requerido.'),
  body('anioNacimiento').notEmpty().withMessage('El año de nacimiento es requerido.'),
  body('centro').notEmpty().withMessage('El campo es requerido')
];

// Crear nueva mascota
const crearMascotas = async (req, res) => {
  try {
    // Validar imagenes
    const imageFile = req.file.path;
    const extension = imageFile.split('.').pop();
    const extensionesPermitidas = ['png', 'jpeg', 'jpg'];
    if (!extensionesPermitidas.includes(extension)) {
        console.error('Extensión de archivo no permitida');
        return res.status(400).send('Error: Extensión de archivo no permitida. Extensiones admitidas: PNG, JPEG, y JPG');
    }
    const result = await cloudinary.uploader.upload(imageFile, {
        folder: 'Mascotas',
    });

    const imagen = result.secure_url;
    // No se pasa el id porque es autoincrementable
    const {nombreApodo, especie, raza, color, anioNacimiento, centro } = req.body;

    // Validación de campos
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos inválidos',
        errors: errores.array()
      });
    }

    // Crear la nueva mascota (sin el campo 'id' ya que es autoincrementable)
    const mascota = await mascotas.create({
      imagen,
      nombreApodo,
      especie,
      raza,
      color,
      anioNacimiento,
      centro
    });
    fs.unlinkSync(imageFile); // Eliminar el archivo local
    return res.status(200).json({
      success: true,
      message: 'Mascota creada con éxito!!',
      data: mascota
    });
  } catch (error) {
    console.error('Error al crear mascota:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener todas las mascotas
const getAllMascotas = async (req, res) => {
  try {
    const listaMascotas = await mascotas.findAll();
    return res.status(200).json({
      success: true,
      data: listaMascotas
    });
  } catch (error) {
    console.error('Error al obtener mascotas:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener una mascota por ID
const getMascotaById = async (req, res) => {
  const { id } = req.params;
  try {
    const mascota = await mascotas.findByPk(id);
    if (!mascota) {
      return res.status(404).json({
        success: false,
        message: 'Mascota no encontrada'
      });
    }
    return res.status(200).json({
      success: true,
      data: mascota
    });
  } catch (error) {
    console.error('Error al obtener mascota:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar una mascota
const actualizarMascota = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  try {
    const [updated] = await mascotas.update(req.body, {
      where: { id }
    });
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Mascota no encontrada'
      });
    }
    const mascotaActualizada = await mascotas.findByPk(id);
    return res.status(200).json({
      success: true,
      message: 'Mascota actualizada exitosamente',
      mascota: mascotaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar mascota:', error);
    return res.status(400).json({
      success: false,
      message: error.errors ? error.errors.map(e => e.message).join(', ') : 'Error al actualizar la mascota'
    });
  }
};

// Eliminar una mascota
const eliminarMascota = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await mascotas.destroy({
      where: { id }
    });
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Mascota no encontrada'
      });
    }
    return res.status(204).json({ success: true });
  } catch (error) {
    console.error('Error al eliminar mascota:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Exportar funciones del controlador
module.exports = {
  crearMascotas,
  getAllMascotas,
  getMascotaById,
  actualizarMascota,
  eliminarMascota
};

const { body, validationResult } = require('express-validator');
const mascotas = require('../models/modelMascotas');

// Validaciones para crear y actualizar una mascota
const validarMascota = [
  body('nombreApodo').notEmpty().withMessage('El nombre o apodo es requerido.'),
  body('especie').notEmpty().withMessage('La especie es requerida.'),
  body('raza').notEmpty().withMessage('La raza es requerida.'),
  body('color').notEmpty().withMessage('El color es requerido.'),
  body('anioNacimiento').notEmpty().withMessage('El año de nacimiento es requerido.')
];

// Crear nueva mascota
const crearMascotas = async (req, res) => {
  // console.log("holaa llegaron los datos");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  try {
    const nuevaMascota = await mascotas.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Mascota registrada exitosamente',
      mascota: nuevaMascota
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.errors ? error.errors.map(e => e.message).join(', ') : 'Error al registrar la mascota'
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
  eliminarMascota,
  validarMascota
};

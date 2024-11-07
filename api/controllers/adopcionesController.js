const Adopcion = require('../models/modelAdopcion');

const obtenerTodos = async (req, res) => {
    try {
      const adop = await Adopcion.findAll();
      return res.status(200).json({
        success: true,
        data: adop
      });
    } catch (error) {
      console.error('Error al obtener adopciones:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
}

const crear = async (req, res) => {
    try {
      const {dni, nombre, apellido, telefono, direccion, genero, email, id_mascota, dni_rescatista} = req.body;
      const adop = await Adopcion.create ({dni, nombre, apellido, telefono, direccion, genero, email, id_mascota, dni_rescatista});  
  
      return res.status(200).json({
        success: true,
        message: 'Adopcion creada con éxito!',
        data: adop
      });
    } catch (error) {
      console.error('Error al crear la adopcion:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
};

const borrar = async (req, res) => {
    const { id_adopcion } = req.params;
    try {
      const deleted = await Adopcion.destroy({
        where: { id_adopcion }
      });

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Adopcion no encontrada'
        });
      }
      return res.status(200).json({ success: true, message: 'Adopcion borrada con exito'});
    } catch (error) {
      console.error('Error al eliminar adopcion:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
};

module.exports = {
    obtenerTodos,
    crear,
    borrar
  }
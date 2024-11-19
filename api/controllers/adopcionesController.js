const Mascota = require('../models/modelMascotas');
const Rescatista = require('../models/modelRescatistas');

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
      console.log("Datos recibidos:", req.body); 
      const {dni, nombre, apellido, telefono, direccion, genero, email, id_mascota, dni_rescatista} = req.body;

      //validamos si existe la mascota en la db

      console.log("Verificando si la mascota existe...");
      const mascota = await Mascota.findByPk(id_mascota);
      if (!mascota) {
        console.log("La mascota no existe.");
          return res.status(400).json({ 
              success: false, 
              message: 'La mascota especificada no existe en la base de datos.' 
          });
      }

      console.log("Verificando si el rescatista existe...");
      //validamos si existe el rescatista en la db
      const rescatista = await Rescatista.findOne({ where: { dni: dni_rescatista } });
      if (!rescatista) {
          console.log("El rescatista no existe.");
          return res.status(400).json({ 
              success: false, 
              message: 'El rescatista especificado no existe en la base de datos.' 
          });
      }

      const adop = await Adopcion.create ({dni, nombre, apellido, telefono, direccion, genero, email, id_mascota, dni_rescatista});  
  
      return res.status(200).json({
        success: true,
        message: 'Adopcion creada con éxito!',
        data: adop
      });
    } catch (error) {
      // retornamos las VALIDACIONES del Modelo "Adopciones" en formato json
      if (error.name === 'SequelizeValidationError') {
        const errores = error.errors.map(err => err.message);
        console.error("Errores de validación:", errores);
        return res.status(400).json({ error: errores });
      }
  
      console.error("Error inesperado:", error);
      return res.status(500).json({error: "Internal Server Error"})
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
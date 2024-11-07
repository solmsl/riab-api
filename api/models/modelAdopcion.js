const { Sequelize } = require('sequelize');
const db = require('../config/db');

/**
 * Modelo del formulario deadopcion que se almacena en la base de datos.
 * @property {number} dni - de la persona
 * @property {string} nombre - El nombre de la persona
 * @property {string} apellido - El apellido de la persona.
 * @property {string} telefono - telefono de la persona.
 * @property {string} direccion - La direccion de  la persona.
 * @property {string} genero - género de la persona.
 * @property {string} email - El correo electronico de la persona.
 * @property {string} id_mascota - id de la mascota a adoptar
 * @property {string} dni_rescatista - dni del rescatista
 */

// Definir la estructura de la tabla rescatista
const Adopcion = db.define('adopciones', {
  id_adopcion : {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  dni: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    validate: {
      isInt: {
        msg: 'El DNI debe ser un número entero'
      },
      notEmpty: { 
        msg: 'Este campo no puede estar vacío' 
      },
      validarDni(value) {
        const dniString = String(value);
        if (dniString.length < 8) {
          throw new Error('DNI inválido: debe tener 8 dígitos.');
        }
        if (dniString.length > 8) {
          throw new Error('DNI inválido: tiene demasiados dígitos.');
        }
      }
    }
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2],
        msg: 'Nombre inválido: debe tener más de 2 caracteres'
      },
      notEmpty: {
        msg: 'Este campo no puede estar vacío'
      }
    }
  },
  apellido: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2],
        msg: 'Apellido inválido: debe tener más de 2 caracteres'
      },
      notEmpty: {
        msg: 'Este campo no puede estar vacío'
      }
    }
  },
  telefono: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isNumeric: {
        msg: 'El teléfono debe contener solo números'
      },
      len: {
        args: [7, 15],
        msg: 'Número de Teléfono inválido: debe tener entre 7 y 15 caracteres'
      },
      notEmpty: {
        msg: 'Este campo no puede estar vacío'
      }
    }
  }, 
  direccion: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-Z0-9\s,.#-]+$/i,
        msg: 'La dirección contiene caracteres no permitidos'
      },
      notEmpty: {
        msg: 'Este campo no puede estar vacío'
      },
      len: {
        args: [1, 255],
        msg: 'Dirección inválida: máximo 255 caracteres'
      }
    }
  },
  genero: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isIn: {
        args: [['M', 'F', 'Otro']],
        msg: 'Género inválido: debe ser Masculino, Femenino u Otro'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Este campo no puede estar vacío'
      },
      isEmail: {
        msg: 'El correo electrónico no es válido'
      }
    }
  },
  id_mascota: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model: 'mascotas',
        key: 'id'
    }
  },
  dni_rescatista: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model: 'rescatistas',
        key: 'dni'
    }
  }
}, {
  timestamps: false
});

// Adopcion.sync({ force: false })
//   .then(() => {
//     console.log('Modelo de Adopcion sincronizado correctamente');
//   })
//   .catch(err => {
//     console.error('Error al sincronizar el Modelo de Adopcion:', err);
//   });

module.exports = Adopcion;
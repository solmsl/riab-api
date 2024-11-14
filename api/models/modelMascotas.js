const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const mascotas = sequelize.define('mascotas', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombreApodo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo nombre/apodo no puede estar vacío'
      },
      len: {
        args: [2, 50],
        msg: 'El nombre/apodo debe tener entre 2 y 50 caracteres.'
      },
      isValidNombre: function(value) {
        if (!/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value)) {
          throw new Error('El nombre/apodo solo puede contener letras y espacios.');
        }
      }
    }
  },
  especie: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo especie no puede estar vacío'
      },
    }
  },
  raza: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo raza no puede estar vacío'
      },
    }
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'color no definido',
    validate: {
      notEmpty: {
        msg: 'El campo color no puede estar vacío'
      },
    }
  },
  anioNacimiento: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo año de nacimiento no puede estar vacío'
      },
    }
  },
  centro: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El centro no puede estar vacío'
      },
    }
  }
}, { timestamps: false });

// Sincronización del modelo con la base de datos
// mascotas.sync({ force: false })
//   .then(() => {
//     console.log('Modelo de mascotas sincronizado correctamente');
//   })
//   .catch(err => {
//     console.error('Error al sincronizar el modelo de mascotas:', err);
//   });

module.exports = mascotas;

const { Sequelize } = require("sequelize-cockroachdb");
const { pg } = require('pg');
const dotenv = require('dotenv');
dotenv.config({path: "./vars/.env"});

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('La conexión se ha establecido exitosamente.');
  } catch (error) {
    console.error('No se puede conectar a la base de datos:', error);
  }
})();

module.exports = sequelize;

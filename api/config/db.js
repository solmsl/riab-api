const { Sequelize } = require("sequelize-cockroachdb");
const { pg } = require('pg');
const dotenv = require('dotenv');
dotenv.config({path: "./vars/.env"});

const sequelize = new Sequelize('postgresql://sole:try1nQB6z9dSwvzvDbUWDA@riab-cluster-4200.j77.aws-us-east-1.cockroachlabs.cloud:26257/riab-bd?sslmode=verify-full', {
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
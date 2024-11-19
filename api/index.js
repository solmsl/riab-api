const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const MascotaM = require('./models/modelMascotas');
const RescatistaM = require('./models/modelRescatistas');
const AdopM = require('./models/modelAdopcion');

// Confuguración de los middlewares
app.use(
    cors({
      credentials: true,
      origin: "https://riab-project.vercel.app",
      methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
    })
  );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static("client", {extensions: ["html", "css", "js"]}));

// Ruta RESCATISTAS
const rescatistas = require('./rutas/rescatistas');
app.use('/rescatistas', rescatistas);

// Ruta MASCOTAS
const mascotas = require('./rutas/mascotas');
app.use('/mascotas', mascotas);

// Ruta Adopcion
const adopciones = require('./rutas/adopcion');
app.use('/adopcion', adopciones);

// en discusion
// Ruta PERSONAS
// const personas = require('./rutas/personas');
// app.use('/personas', personas);

// Ruta HISTORIAL MEDICO
// const historial = require('./rutas/historial');
// app.use('/historial', historial);

// Ruta INICIO
app.get('/', (req, res) => {
  res.send('Bienvenidos al inicio de la página RIAB');
});



// Sincronizar modelos
(async () => {
  try {
      await MascotaM.sync({ force: false });
      console.log('Mascotas sincronizado correctamente');
      
      await RescatistaM.sync({ force: false });
      console.log('Rescatistas sincronizado correctamente');
      
      await AdopM.sync({ force: false });
      console.log('Adopciones sincronizado correctamente');
      
  } catch (err) {
      console.error('Error al sincronizar:', err);
  }
})();

// Mensaje por consola de que todo anda joya
app.listen(3000, () => {
  console.log(`Mi aplicacion esta funcionando en http://localhost:${3000}`);
})

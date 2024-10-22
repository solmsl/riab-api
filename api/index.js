const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Configuración de los middlewares
app.use(
  cors({
    credentials: true,
    origin: "https://project-riab.vercel.app",
    methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("client", { extensions: ["html", "css", "js"] }));

// Ruta RESCATISTAS
const rescatistas = require('./rutas/rescatistas');
app.use('/rescatistas', rescatistas);

// Ruta MASCOTAS
const mascotas = require('./rutas/mascotas');
app.use('/mascotas', mascotas);

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

// Mensaje por consola de que todo anda bien
app.listen(3000, () => {
  console.log(`Mi aplicación está funcionando en http://localhost:${3000}`);
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const cookieParser = require('cookie-parser');

// Confuguración de los middlewares
app.use(
    cors({
      credentials: true,
      origin: "https://riab-project.vercel.app/",
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

// Mensaje por consola de que todo anda joya
app.listen(3000, () => {
  console.log(`Mi aplicacion esta funcionando en http://localhost:${3000}`);
})

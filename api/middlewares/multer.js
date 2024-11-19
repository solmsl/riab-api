// import multer from 'multer';
const multer = require('multer');
const path = require('path');

// Poner la ubicacion de la carpeta de Uploads correspondiente, en este caso se ubica dentro del SRC
const uploadDir = path.join(__dirname, "../images");

// Se define donde se va a ubicar el archivo que vamos a subir y el nombre, este se puede modificar, en este caso el nombre que se le va a asignar es la fecha de subida sumado del nombre del archivo original
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// El siguiente filtro es para que se suban unicamente archivos con extensiones especificas. En este caso serian JPEG, PNG y JPG
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PNG, JPEG, and JPG files are allowed.'), false);
    }
};

const multerUpload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports= multerUpload;
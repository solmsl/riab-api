// import multer from 'multer';
// const multer = require('multer');
// const path = require('path');

// // Poner la ubicacion de la carpeta de Uploads correspondiente, en este caso se ubica dentro del SRC
// const uploadDir = path.join(__dirname, "./");

// // Se define donde se va a ubicar el archivo que vamos a subir y el nombre, este se puede modificar, en este caso el nombre que se le va a asignar es la fecha de subida sumado del nombre del archivo original
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// // El siguiente filtro es para que se suban unicamente archivos con extensiones especificas. En este caso serian JPEG, PNG y JPG.
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Invalid file type. Only PNG, JPEG, and JPG files are allowed.'), false);
//     }
// };

// const multerUpload = multer({
//     storage: storage,
//     fileFilter: fileFilter
// });

// module.exports= multerUpload;

//---------------------------------------------------------ejemplo 2
// const { v2: cloudinary } = require('cloudinary');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// //configuración de Cloudinary
// cloudinary.config({
//     cloud_name: 'dhr3ewnzn',
//     api_key: '588332998652531',
//     api_secret: '3SLVPLYfItuSt2qzsBaggNDk5WQ'
// });

// // Ruta absoluta para evitar problemas en entornos como AWS Lambda o contenedores
// const uploadDir = path.resolve(__dirname, '../uploads');

// // Crear carpeta si no existe
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }
// // Carpeta temporal
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDir = path.join(__dirname, '../uploads');
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//         }
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Invalid file type. Only PNG, JPEG, and JPG files are allowed.'));
//     }
// };

// const upload = multer({ storage, fileFilter });


// //middleware de subida
// const uploadToCloudinary = async (req, res, next) => {
//     if (!req.file || !req.file.path) {
//         return res.status(400).send('No se subió ningún archivo.');
//     }

//     try {
//         const result = await cloudinary.uploader.upload(req.file.path, {
//             folder: 'mascotas',
//         });

//         req.file.cloudinaryUrl = result.secure_url;

//         fs.unlinkSync(req.file.path); // Eliminar archivo temporal

//         next();
//     } catch (error) {
//         console.error('Error al subir a Cloudinary:', error);
//         res.status(500).send('Error al subir la imagen.');
//     }
// };

// module.exports = { upload, uploadToCloudinary };
//----------------------------------------------------------ejemplo3


const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: 'dhr3ewnzn',
    api_key: '588332998652531',
    api_secret: '3SLVPLYfItuSt2qzsBaggNDk5WQ'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'mascotas',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage });

module.exports = upload;

// const { v2: cloudinary } = require('cloudinary');

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const cloudinary = require('../config/cloudinary_config');

// Configuración de Cloudinary
// cloudinary.config({
//     cloud_name: 'dhr3ewnzn',
//     api_key: '588332998652531',
//     api_secret: '3SLVPLYfItuSt2qzsBaggNDk5WQ'
// });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'mascotas',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage });

module.exports = upload;

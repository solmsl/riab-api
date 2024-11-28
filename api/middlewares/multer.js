const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const cloudinary = require('../config/cloudinary_config');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        const {nombreApodo} = req.body;
        return {
            folder: 'mascotas',
            allowed_formats: ['jpg', 'jpeg', 'png'],
            public_id: nombreApodo, // Genera un public_id único
        };
    },
});

const upload = multer({ storage });

module.exports = upload;

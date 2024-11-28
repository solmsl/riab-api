const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const cloudinary = require('../config/cloudinary_config');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        return {
            folder: 'mascotas',
            allowed_formats: ['jpg', 'jpeg', 'png'],
            public_id: req.body.nombreApodo,
        };
    },
});

const upload = multer({ storage });

module.exports = upload;

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const cloudinary = require('../config/cloudinary_config');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'mascotas',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: req.body.nombreApodo,
    },
});

const upload = multer({ storage });

module.exports = upload;

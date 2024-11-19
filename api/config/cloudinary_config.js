const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config({path: "./vars/.env"});
cloudinary.config({
    cloud_name: 'dhr3ewnzn',
    api_key: '588332998652531',
    api_secret: '3SLVPLYfItuSt2qzsBaggNDk5WQ'
});
// export default cloudinary;
// export default cloudinary
module.exports = cloudinary
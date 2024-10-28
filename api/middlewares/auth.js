const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: "./vars/.env"});

const verificacion = (req, res, next) => {
  const authHeader = req.cookies.token || req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. No hay token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.rescatista = decoded;
    console.log(req.rescatista)

    next();
  } catch (error) {
    return res.status(403).json({ error: "Token no válido o expirado." });
  }
};

module.exports = {
    verificacion
}
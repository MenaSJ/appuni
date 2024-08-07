const jwt = require('jsonwebtoken'); // Importa el módulo jsonwebtoken para manejar JWT

// Middleware para verificar el JWT
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); 
    const token = authHeader.split(' ')[1]; // Divide el header y obtiene el token (después de "Bearer ")
    // Verifica el token usando la clave secreta
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET, // Clave secreta para verificar el token
        (err, decoded) => { // Callback que maneja la verificación
            if (err) return res.sendStatus(403); // Si hay un error (token inválido), devuelve un estado 403 (Prohibido)
            req.user = decoded.UserInfo.username; 
            req.roles = decoded.UserInfo.roles;
            next(); 
        }
    );
}

module.exports = verifyJWT; // Exporta el middleware para usarlo en otras partes de la aplicación

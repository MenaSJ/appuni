const User = require('../models/usuarios');
const jwt = require('jsonwebtoken'); // Importa el módulo jsonwebtoken para manejar JWT
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies; // Obtiene las cookies de la solicitud
    if (!cookies?.jwt) return res.sendStatus(401); // Si no hay cookie jwt, responde con 401 (No autorizado)
    console.log(cookies.jwt); // Imprime el valor de la cookie jwt para depuración
    const refreshToken = cookies.jwt; // Almacena el valor de la cookie jwt en una variable

    const foundUser = await User.findOne({ refreshToken }).exec(); // Busca el usuario que tiene el refresh token correspondiente
    if (!foundUser) return res.sendStatus(401); // Si no se encuentra el usuario, responde con 401 (No autorizado)

    // Verifica el refresh token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET, // Clave secreta para verificar el refresh token
        (err, decoded) => { // Callback que maneja la verificación
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403); // Si hay un error o el nombre de usuario no coincide, responde con 403 (Prohibido)
            const roles = Object.values(foundUser.roles);
            // Si el token es válido, genera un nuevo access token
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                }, // Payload del access token
                process.env.ACCESS_TOKEN_SECRET, // Clave secreta para firmar el access token
                { expiresIn: '30s' } // El access token expira en 30 segundos
            );
            res.json({roles, accessToken }); // Envía el nuevo access token en la respuesta
        }
    );
}

module.exports = { handleRefreshToken }; // Exporta la función handleRefreshToken

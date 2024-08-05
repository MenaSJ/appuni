const User = require('../models/usuarios');
const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
    
    const cookies = req.cookies; // Obtiene las cookies de la solicitud
    if (!cookies?.jwt) return res.sendStatus(204); // Si no hay cookie jwt, responde con 401 (No autorizado)
    const refreshToken = cookies.jwt; // Almacena el valor de la cookie jwt en una variable
    // is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec(); // Busca el usuario que tiene el refresh token correspondiente
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        return res.sendStatus(204); 
    }
    //Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);


    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout }; // Exporta la función handleRefreshToken
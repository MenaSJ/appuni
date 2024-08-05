const db = require('../config/db'); // Asegúrate de tener la conexión a la base de datos

const findUserByEmail = (correo, callback) => {
    const query = 'SELECT correo FROM usuarios WHERE correo = ?';
    db.query(query, [correo], callback);
};

const updateTokenAndExpiration = (correo, token, expirationTime, callback) => {
    const query = 'UPDATE usuarios SET token = ?, token_time = ? WHERE correo = ?';
    db.query(query, [token, expirationTime, correo], callback);
};

const findUserByToken = (token, callback) => {
    const query = 'SELECT correo, token_time FROM usuarios WHERE token = ?';
    db.query(query, [token], callback);
};

const updatePassword = (correo, hashedPassword, callback) => {
    const query = 'UPDATE usuarios SET contrasena = ?, token = NULL, token_time = NULL WHERE correo = ?';
    db.query(query, [hashedPassword, correo], callback);
};

module.exports = {
    findUserByEmail,
    updateTokenAndExpiration,
    findUserByToken,
    updatePassword
};

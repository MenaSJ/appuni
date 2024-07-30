const { logEvents } = require('./logEvents');

// Middleware de manejo de errores
const errorHandler = (err, req, res, next) => {
    // Registra el error en un archivo de registro
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    // Muestra el stack trace del error en la consola
    console.log(err.stack);
    // Envía una respuesta con el estado 500 y el mensaje de error
    res.status(500).send(err.message);
}
module.exports = errorHandler
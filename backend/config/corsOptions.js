const allowedOrigins = require('./allowedOrigins');

// Opciones de configuración de CORS
const corsOptions = {
    // Función que verifica si el origen está en la lista blanca
    origin: (origin, callback) => {
        // Si el origen está en la lista blanca o no hay origen (por ejemplo, en solicitudes hechas desde el mismo servidor)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Permite la solicitud
        } else {
            // Si el origen no está en la lista blanca, bloquea la solicitud
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200 
};

module.exports = corsOptions;
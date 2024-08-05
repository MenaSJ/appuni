// models/Favorito.js
const mongoose = require('mongoose');

const FavoritoSchema = new mongoose.Schema({
    usuarioID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Asegúrate de que el modelo de usuario esté registrado como 'User'
        required: true 
    },
    universidadID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Universidad', // Asegúrate de que el modelo de universidad esté registrado como 'Universidad'
        required: true 
    },
    fechaAgregado: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Favorito', FavoritoSchema);

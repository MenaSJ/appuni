// models/Universidad.js
const mongoose = require('mongoose');

const UniversidadSchema = new mongoose.Schema({
  Nombre: { type: String, required: true, unique: true },
  Siglas: { type: String, required: true },
  Pagina_Web: { type: String, required: true },
  Vision: { type: String, required: true },
  Mision: { type: String, required: true },
  Logo: { type: String, required: true },
  Latitud: { type: Number, required: true },
  Longitud: { type: Number, required: true },
  Carreras: [
    {
      Carrera: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('Universidad', UniversidadSchema);

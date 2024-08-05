// models/Carrera.js
const mongoose = require('mongoose');

const CarreraSchema = new mongoose.Schema({
  Nombre: { type: String, required: true, unique: true  }
});

module.exports = mongoose.model('Carrera', CarreraSchema);

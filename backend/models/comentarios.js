// models/Comentario.js
const mongoose = require('mongoose');

const ComentarioSchema = new mongoose.Schema({
  universidadID: { type: mongoose.Schema.Types.ObjectId, ref: 'Universidad', required: true },
  usuarioID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comentario: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comentario', ComentarioSchema);

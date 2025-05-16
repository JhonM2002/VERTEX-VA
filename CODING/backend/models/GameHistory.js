const mongoose = require('mongoose');

const gameHistorySchema = new mongoose.Schema({
  observacion: { type: String, required: true },
  tiempo: { type: String, required: true },
  errores: { type: Number, required: true },
  aciertos: { type: Number, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
  nombrePaciente: { type: String, required: true },
  nombreTerapeuta: { type: String, required: true }
});

module.exports = mongoose.model('GameHistory', gameHistorySchema);

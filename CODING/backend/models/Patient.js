const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  cedula: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' } // Relación con Therapist
});

module.exports = mongoose.model('Patient', PatientSchema);

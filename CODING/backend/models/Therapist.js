const mongoose = require('mongoose');

const TherapistSchema = new mongoose.Schema({
  cedula: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
});

module.exports = mongoose.model('Therapist', TherapistSchema);

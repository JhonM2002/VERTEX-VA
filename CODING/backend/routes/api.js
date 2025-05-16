const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Rutas para Terapeutas
router.post('/therapist', gameController.addTherapist); // Agregar terapeuta
router.get('/therapist/:id', gameController.getTherapistById); // Obtener terapeuta por ID
router.get('/therapists', gameController.getAllTherapists); // Obtener todos los terapeutas

// Rutas para Pacientes
router.post('/patient', gameController.addPatient); // Agregar paciente
router.get('/patient/:id', gameController.getPatientById); // Obtener paciente por ID
router.get('/patient/:id/history', gameController.getPatientHistory); // Obtener historial de juegos de un paciente específico
router.get('/patient/history/nombre/:nombre', gameController.getPatientHistoryByName); // Historial de juegos por nombre
router.get('/patients', gameController.getAllPatients); // Obtener todos los pacientes

// Ruta para verificar las cédulas del terapeuta y del paciente
router.post('/verify-cedulas', gameController.verifyCedulas);

// Ruta para obtener terapeuta por cédula
router.get('/therapist/cedula/:cedula', gameController.getTherapistByCedula);

// Ruta para obtener paciente por cédula
router.get('/patient/cedula/:cedula', gameController.getPatientByCedula);

// Ruta para guardar el historial de juego
router.post('/gamehistories', gameController.addGameHistory);
// Rutas para Historial de Juegos
router.get('/gamehistory/:id', gameController.getGameHistoryById); // Obtener historial de juego por ID
router.get('/gamehistories', gameController.getAllGameHistories); // Obtener todos los historiales de juego

router.get('/therapist/:cedula/patients', gameController.getPatientsByTherapist);

// Ruta para buscar historial por nombre de paciente
router.get('/patient/history/nombre/:nombre', gameController.getPatientHistoryByName);

module.exports = router;


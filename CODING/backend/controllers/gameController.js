const Therapist = require('../models/Therapist');
const Patient = require('../models/Patient');
const GameHistory = require('../models/GameHistory');

exports.verifyCedulas = async (req, res) => {
    try {
      const { therapistCedula, patientCedula } = req.body;
      console.log('Verificando cédulas:', therapistCedula, patientCedula);
  
      // Verificar si el terapeuta existe en la colección de terapeutas
      const therapist = await Therapist.findOne({ cedula: therapistCedula });
      console.log('Resultado de búsqueda del terapeuta:', therapist);
      if (!therapist) {
        return res.status(404).json({ message: 'La cédula del terapeuta no existe.' });
      }
  
      // Verificar si el paciente existe en la colección de pacientes
      const patient = await Patient.findOne({ cedula: patientCedula });
      console.log('Resultado de búsqueda del paciente:', patient);
      if (!patient) {
        return res.status(404).json({ message: 'La cédula del paciente no existe.' });
      }
  
      // Si ambos existen
      res.status(200).json({ message: 'Ambas cédulas existen.' });
    } catch (err) {
      console.error('Error en verifyCedulas:', err);
      res.status(500).json({ error: err.message });
    }
  };

// Obtener terapeuta por cédula
exports.getTherapistByCedula = async (req, res) => {
    try {
      const therapist = await Therapist.findOne({ cedula: req.params.cedula });
      if (therapist) {
        res.json(therapist);
      } else {
        res.status(404).json({ message: 'Terapeuta no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Obtener paciente por cédula
  exports.getPatientByCedula = async (req, res) => {
    try {
      const patient = await Patient.findOne({ cedula: req.params.cedula });
      if (patient) {
        res.json(patient);
      } else {
        res.status(404).json({ message: 'Paciente no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Agregar terapeuta
exports.addTherapist = async (req, res) => {
  try {
    const existingTherapist = await Therapist.findOne({ cedula: req.body.cedula });
    if (existingTherapist) {
      return res.status(400).json({ message: 'El terapeuta con esta cédula ya existe' });
    }

    const therapist = new Therapist(req.body);
    await therapist.save();
    res.status(201).json(therapist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Obtener historial de juegos de un paciente específico por nombre
exports.getPatientHistoryByName = async (req, res) => {
  try {
    console.log('Nombre recibido:', req.params.nombre); // Depuración
    const patient = await Patient.findOne({ nombre: req.params.nombre });
    if (!patient) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    const patientHistory = await GameHistory.find({ patient: patient._id })
      .populate('patient', 'nombre')
      .populate('therapist', 'nombre');
    res.json(patientHistory);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
};


// Obtener terapeuta por ID
exports.getTherapistById = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);
    if (therapist) {
      res.json(therapist);
    } else {
      res.status(404).json({ message: 'Terapeuta no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Agregar paciente
exports.addPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener paciente por ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: 'Paciente no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Obtener historial de juego por ID
exports.getGameHistoryById = async (req, res) => {
  try {
    const gameHistory = await GameHistory.findById(req.params.id);
    if (gameHistory) {
      res.json(gameHistory);
    } else {
      res.status(404).json({ message: 'Historial de juego no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener historial de juegos de un paciente específico
exports.getPatientHistory = async (req, res) => {
  try {
    const patientHistory = await GameHistory.find({ patient: req.params.id });
    res.json(patientHistory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los historiales de juego
exports.getAllGameHistories = async (req, res) => {
  try {
    const gameHistories = await GameHistory.find()
     .populate('patient', 'nombre')     // Obtiene solo el campo "nombre" del paciente
    .populate('therapist', 'nombre');  // Obtiene solo el campo "nombre" del terapeuta
    res.json(gameHistories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllHistories = async (req, res) => {
    try {
      const histories = await GameHistory.find()
        .populate('patient', 'nombre') // Solo traer el nombre del paciente
        .populate('therapist', 'nombre'); // Solo traer el nombre del terapeuta
      res.json(histories);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el historial' });
    }

    
  };
  
  // Agregar historial de juego
  exports.addGameHistory = async (req, res) => {
    try {
      console.log('Endpoint /gamehistories fue llamado');
      console.log('Datos recibidos:', req.body);
  
      const {
        observacion,
        tiempo,
        errores,
        aciertos,
        patient,
        therapist,
        nombrePaciente,
        nombreTerapeuta
      } = req.body;
  
      if (!patient || !therapist || !observacion || !tiempo || errores === undefined || aciertos === undefined) {
        console.error('Faltan datos requeridos:', req.body);
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }
      console.log('Datos recibidos:', req.body);

      const gameHistory = new GameHistory({
        observacion,
        tiempo,
        errores,
        aciertos,
        patient,
        therapist,
        nombrePaciente,
        nombreTerapeuta
      });
      console.log('Guardando en la base de datos...', gameHistory);
      await gameHistory.save();
  
      res.status(201).json({
        message: 'Historial de juego guardado exitosamente',
        gameHistory
      });
    } catch (err) {
      console.error('Error al guardar el historial de juego:', err);
      res.status(500).json({ error: 'Error al guardar el historial de juego' });
    }
  };
  
// Obtener todos los terapeutas
exports.getAllTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find({}, '_id nombre cedula'); // Solo traer los campos necesarios
    res.status(200).json(therapists);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los terapeutas' });
  }
};

// Obtener todos los pacientes
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}, '_id nombre cedula'); // Relacionar con el terapeuta
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pacientes' });
  }
};

// Obtener pacientes por terapeuta
exports.getPatientsByTherapist = async (req, res) => {
  try {
    const therapist = await Therapist.findOne({ cedula: req.params.cedula });
    if (!therapist) {
      return res.status(404).json({ message: 'Terapeuta no encontrado' });
    }

    const patients = await Patient.find({ therapist: therapist._id }, 'nombre cedula'); // Relacionar por ID
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pacientes del terapeuta' });
  }
};


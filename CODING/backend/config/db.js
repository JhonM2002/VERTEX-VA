// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/juegoAlzheimer', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a la base de datos MongoDB');
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  }
};

module.exports = connectDB;

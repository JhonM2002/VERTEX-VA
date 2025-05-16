// backend/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Middleware para parsear JSON
app.use(express.json());
// Rutas
app.use('/api', require('./routes/api'));
app.use('/api', apiRoutes);

module.exports = app;

// src/app.js
const express = require('express');
const cors = require('cors');
const equiposRoutes = require('./routes/equipos.routes');
const prestamosRoutes = require('./routes/prestamos.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/equipos', equiposRoutes);
app.use('/api/prestamos', prestamosRoutes);

module.exports = app;
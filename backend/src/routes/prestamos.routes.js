// src/routes/prestamos.routes.js
const express = require('express');
const router = express.Router();
const prestamosController = require('../controllers/prestamos.controller');

router.get('/', prestamosController.getAll);
router.post('/', prestamosController.create);
router.delete('/:id', prestamosController.remove);

module.exports = router;
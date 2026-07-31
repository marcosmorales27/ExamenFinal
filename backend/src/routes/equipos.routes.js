const express = require('express');
const router = express.Router();
const equiposController = require('../controllers/equipos.controller');

router.get('/', equiposController.getAll);
router.get('/:id', equiposController.getById);
router.patch('/:id/estado', equiposController.updateEstado);

module.exports = router;
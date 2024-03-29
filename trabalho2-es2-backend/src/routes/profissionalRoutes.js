const express = require('express');
const router = express.Router();

const profissionalController = require('../controller/profissionalController');

router.get('/listar', profissionalController.listarProfissional);
router.get('/buscar/:id', profissionalController.buscarProfissional);

module.exports = router;
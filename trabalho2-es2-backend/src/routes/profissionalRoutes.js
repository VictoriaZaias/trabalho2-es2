const express = require('express');
const router = express.Router();

const profissionalController = require('../controller/profissionalController');

router.get('/listar', profissionalController.listarProfissional);

module.exports = router;
const express = require('express');
const router = express.Router();

const especialidadeController = require('../controller/especialidadeController');

router.get('/listar', especialidadeController.listarEspecialidades);

module.exports = router;
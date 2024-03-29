const express = require('express');
const router = express.Router();

const unidadeFederativaController = require('../controller/unidadeFederativaController');

router.get('/listarUnidadesFederativas', unidadeFederativaController.listarUnidadeFederativa);

module.exports = router;
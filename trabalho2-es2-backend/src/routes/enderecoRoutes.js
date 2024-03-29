const express = require('express');
const router = express.Router();

const cidadeController = require('../controller/cidadeController');
const unidadeFederativaController = require('../controller/unidadeFederativaController');

router.get('/listarUnidadesFederativas', unidadeFederativaController.listarUnidadeFederativa);

router.get('/buscarCidade/:id', cidadeController.buscarCidade);
router.post('/inserirCidade', cidadeController.inserirCidade);

module.exports = router;
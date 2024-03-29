const express = require('express');
const router = express.Router();

const cidadeController = require('../controller/cidadeController');
const unidadeFederativaController = require('../controller/unidadeFederativaController');

router.get('/listarUnidadesFederativas', unidadeFederativaController.listarUnidadesFederativas);
router.get('/buscarUnidadeFederativa/:id', unidadeFederativaController.buscarUnidadeFederativa);
router.get('/buscarIdUnidadeFederativa/:nomeUnidadeFederativa', unidadeFederativaController.buscarIdUnidadeFederativa);

router.get('/buscarCidade/:id', cidadeController.buscarCidade);
router.post('/inserirCidade', cidadeController.inserirCidade);
router.get('/buscarIdCidade/:nomeCidade', cidadeController.buscarIdCidade);

module.exports = router;
const express = require('express');
const router = express.Router();

const unidadeFederativaController = require('../controller/unidadeFederativaController');
const cidadeController = require('../controller/cidadeController');
const bairroController = require('../controller/bairroController');

router.get('/listarUnidadesFederativas', unidadeFederativaController.listarUnidadesFederativas);
router.get('/buscarUnidadeFederativa/:id', unidadeFederativaController.buscarUnidadeFederativa);
router.get('/buscarIdUnidadeFederativa/:nomeUnidadeFederativa', unidadeFederativaController.buscarIdUnidadeFederativa);

router.get('/buscarCidade/:id', cidadeController.buscarCidade);
router.post('/inserirCidade', cidadeController.inserirCidade);
router.get('/buscarIdCidade/:nomeCidade', cidadeController.buscarIdCidade);

router.get('/buscarBairro/:id', bairroController.buscarBairro);
router.post('/inserirBairro', bairroController.inserirBairro);

module.exports = router;
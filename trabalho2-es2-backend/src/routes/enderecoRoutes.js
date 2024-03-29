const express = require('express');
const router = express.Router();

const unidadeFederativaController = require('../controller/unidadeFederativaController');
const cidadeController = require('../controller/cidadeController');
const bairroController = require('../controller/bairroController');
const tipoLogradouroController = require('../controller/tipoLogradouroController');
const logradouroController = require('../controller/logradouroController');
const enderecoController = require('../controller/enderecoController');

router.get('/listarUnidadesFederativas', unidadeFederativaController.listarUnidadesFederativas);
router.get('/buscarUnidadeFederativa/:id', unidadeFederativaController.buscarUnidadeFederativa);
router.get('/buscarIdUnidadeFederativa/:nomeUnidadeFederativa', unidadeFederativaController.buscarIdUnidadeFederativa);

router.get('/buscarCidade/:id', cidadeController.buscarCidade);
router.post('/inserirCidade', cidadeController.inserirCidade);
router.get('/buscarIdCidade/:nomeCidade', cidadeController.buscarIdCidade);

router.get('/buscarBairro/:id', bairroController.buscarBairro);
router.post('/inserirBairro', bairroController.inserirBairro);
router.get('/buscarIdBairro/:nomeBairro', bairroController.buscarIdBairro);

router.get('/buscarTipoLogradouro/:id', tipoLogradouroController.buscarTipoLogradouro);
router.post('/inserirTipoLogradouro', tipoLogradouroController.inserirTipoLogradouro);
router.get('/buscarIdTipoLogradouro/:nomeTipoLogradouro', tipoLogradouroController.buscarIdTipoLogradouro);

router.get('/buscarLogradouro/:id', logradouroController.buscarLogradouro);
router.post('/inserirLogradouro', logradouroController.inserirLogradouro);
router.get('/buscarIdLogradouro/:nomeLogradouro', logradouroController.buscarIdLogradouro);

router.get('/buscarEndereco/:cep', enderecoController.buscarEndereco);
router.post('/inserirEndereco', enderecoController.inserirEndereco);
router.get('/buscarIdEndereco/:cep', enderecoController.buscarIdEndereco);

module.exports = router;
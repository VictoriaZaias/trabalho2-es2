const express = require('express');
const router = express.Router();

const projetoController = require('../controller/projetoController')

router.get('/listar',projetoController.listarProjetos);
router.get('/buscar/:id', projetoController.buscarProjeto);

module.exports = router;
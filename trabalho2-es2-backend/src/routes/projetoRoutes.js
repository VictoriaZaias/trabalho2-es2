const express = require('express');
const router = express.Router();

const projetoController = require('../controller/projetoController')

router.get('/listar',projetoController.listarProjetos);
router.get('/buscar/:id', projetoController.buscarProjeto);
router.post('/inserir',projetoController.inserirProjeto);

module.exports = router;
const express = require('express');
const router = express.Router();

const profissionalController = require('../controller/profissionalController');

router.get('/listar', profissionalController.listarProfissionais);
router.get('/buscar/:id', profissionalController.buscarProfissional);
router.post('/inserir', profissionalController.inserirProfissional);
router.put('/alterar/:id', profissionalController.alterarProfissional);
router.delete('/excluir/:id', profissionalController.excluirProfissional);

module.exports = router;
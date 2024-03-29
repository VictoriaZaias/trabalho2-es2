const express = require('express');
const router = express.Router();

const timeController = require('../controller/timeController');

router.get('/listar', timeController.listarTimes);
router.get('/buscar/:id', timeController.buscarTime);
router.post('/inserir', timeController.inserirTime);
router.put('/alterar/:id', timeController.alterarTime);
router.put('/excluir/:id', timeController.excluirTime);

module.exports = router;
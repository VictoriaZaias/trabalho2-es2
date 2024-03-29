const express = require('express');
const router = express.Router();

const projetoController = require('../controller/projetoController')

router.get('/listar',projetoController.listarProjetos);

module.exports = router;
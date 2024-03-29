const express = require('express');
const router = express.Router();

const timeController = require('../controller/timeController');

router.get('/listar', timeController.listarTimes);

module.exports = router;
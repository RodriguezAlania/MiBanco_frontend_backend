const express = require('express');
const router = express.Router();
const { misCuentas } = require('../controllers/cuentasController');
const { verificarToken } = require('../middlewares/auth');

router.get('/mias', verificarToken, misCuentas);

module.exports = router;

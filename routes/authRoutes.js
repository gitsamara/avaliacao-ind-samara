const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

// rotas públicas (não precisam de token)
router.post('/registrar', authController.registrar);
router.post('/login', authController.login);

module.exports = router;

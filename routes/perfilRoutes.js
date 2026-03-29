const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController.js');
const { autenticarToken } = require('../middleware/auth.js');

router.get('/perfil', autenticarToken, perfilController.obterTodosPerfis);
router.post('/perfil', autenticarToken, perfilController.criarPerfil);
router.delete('/perfil/:id', autenticarToken, perfilController.deletarPerfil);
router.put('/perfil/:id', autenticarToken, perfilController.editarPerfil);

module.exports = router;

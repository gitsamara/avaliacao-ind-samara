const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController.js');
const { autenticarToken } = require('../middleware/auth.js');

router.get('/turma', autenticarToken, turmaController.obterTodasTurmas);
router.post('/turma', autenticarToken, turmaController.criarTurma);
router.delete('/turma/:id', autenticarToken, turmaController.deletarTurma);
router.put('/turma/:id', autenticarToken, turmaController.editarTurma);

module.exports = router;

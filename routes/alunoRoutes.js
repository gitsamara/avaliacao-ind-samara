const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController.js');
const { autenticarToken } = require('../middleware/auth.js');

// CRITÉRIO 3: todas as rotas protegidas com autenticarToken
router.get('/aluno', autenticarToken, alunoController.obterTodosAlunos);
router.post('/aluno', autenticarToken, alunoController.criarAluno);
router.delete('/aluno/:id', autenticarToken, alunoController.deletarAluno);
router.put('/aluno/:id', autenticarToken, alunoController.editarAluno);

module.exports = router;

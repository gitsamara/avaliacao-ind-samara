const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController.js');
const { autenticarToken } = require('../middleware/auth.js');

router.get('/disciplina', autenticarToken, disciplinaController.obterTodasDisciplinas);
router.post('/disciplina', autenticarToken, disciplinaController.criarDisciplina);
router.delete('/disciplina/:id', autenticarToken, disciplinaController.deletarDisciplina);
router.put('/disciplina/:id', autenticarToken, disciplinaController.editarDisciplina);

module.exports = router;

const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController.js');
const { autenticarToken } = require('../middleware/auth.js');

router.get('/professor', autenticarToken, professorController.obterTodosProfessores);
router.post('/professor', autenticarToken, professorController.criarProfessor);
router.delete('/professor/:id', autenticarToken, professorController.deletarProfessor);
router.put('/professor/:id', autenticarToken, professorController.editarProfessor);

module.exports = router;

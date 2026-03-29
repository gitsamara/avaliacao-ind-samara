const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController.js');
const { autenticarToken } = require('../middleware/auth.js');

router.get('/tarefa', autenticarToken, tarefaController.obterTodasTarefas);
router.post('/tarefa', autenticarToken, tarefaController.criarTarefa);
router.delete('/tarefa/:id', autenticarToken, tarefaController.deletarTarefa);
router.put('/tarefa/:id', autenticarToken, tarefaController.editarTarefa);

module.exports = router;

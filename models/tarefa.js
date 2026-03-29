let mongoose = require('mongoose');

// CORREÇÃO DE ERRO: o código original fazia:
//   const Aluno = require("../models/aluno.js");
//   aluno: { type: ..., ref: Aluno }   ← ERRADO: passa o model object
//
// o correto é passar a STRING com o nome do model:
//   aluno: { type: ..., ref: "Aluno" } ← CORRETO
//
// além disso, o require de Aluno aqui causava dependência circular
// (aluno.js → nenhum, tarefa.js → aluno.js → ok),
// mas a passagem do objeto como ref fazia o mongoose não resolver
// corretamente o populate, gerando erro silencioso ou cast error

let tarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  concluida: { type: Boolean, default: false },
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aluno', // CORRIGIDO: string em vez do objeto importado
  },
  disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina' }],
});

module.exports = mongoose.model('Tarefa', tarefaSchema);

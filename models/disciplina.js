let mongoose = require('mongoose');

// CORREÇÃO DE ERRO: removido o require circular de tarefa.js que causava
// problemas de dependência circular entre disciplina <-> tarefa
// a referência é feita apenas pela string "Tarefa" no populate

let disciplinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  dataInicio: { type: Date, default: Date.now },
  dataFim: { type: Date },
  tarefas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tarefa' }],
});

module.exports = mongoose.model('Disciplina', disciplinaSchema);

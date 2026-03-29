const Tarefa = require('../models/tarefa.js');

const criarTarefa = async (req, res) => {
  try {
    const { titulo, alunoId, disciplinasIds } = req.body;

    if (!titulo) {
      return res.status(400).json({ erro: 'O título da tarefa é obrigatório.' });
    }

    const novaTarefa = new Tarefa({
      titulo,
      concluida: false,
      aluno: alunoId,
      disciplinas: disciplinasIds || [],
    });

    await novaTarefa.save();

    return res.status(201).json({ message: 'Tarefa criada com sucesso!', tarefa: novaTarefa });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao criar tarefa.', detalhe: err.message });
  }
};

const obterTodasTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find().populate('aluno').populate('disciplinas');
    return res.status(200).json(tarefas);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar tarefas.', detalhe: err.message });
  }
};

const deletarTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const tarefa = await Tarefa.findById(id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada.' });

    await Tarefa.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Tarefa removida com sucesso!' });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao deletar tarefa.', detalhe: err.message });
  }
};

const editarTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, concluida } = req.body;

    const tarefa = await Tarefa.findByIdAndUpdate(id, { titulo, concluida }, { new: true });

    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada.' });

    return res.status(200).json({ message: 'Tarefa atualizada com sucesso!', tarefa });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao editar tarefa.', detalhe: err.message });
  }
};

module.exports = { criarTarefa, obterTodasTarefas, deletarTarefa, editarTarefa };

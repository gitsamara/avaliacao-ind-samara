const Disciplina = require('../models/disciplina.js');
const Tarefa = require('../models/tarefa.js');

const criarDisciplina = async (req, res) => {
  try {
    const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'O nome da disciplina é obrigatório.' });
    }

    const novaDisciplina = new Disciplina({
      nome,
      descricao,
      dataInicio,
      dataFim,
      tarefas: tarefasIds || [],
    });

    await novaDisciplina.save();

    if (tarefasIds && tarefasIds.length > 0) {
      await Tarefa.updateMany(
        { _id: { $in: tarefasIds } },
        { $push: { disciplinas: novaDisciplina._id } }
      );
    }

    return res.status(201).json({
      message: 'Disciplina criada com sucesso!',
      disciplina: novaDisciplina,
    });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao criar disciplina.', detalhe: err.message });
  }
};

const obterTodasDisciplinas = async (req, res) => {
  try {
    const disciplinas = await Disciplina.find().populate('tarefas');
    return res.status(200).json(disciplinas);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar disciplinas.', detalhe: err.message });
  }
};

const deletarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;

    const disciplina = await Disciplina.findById(id);
    if (!disciplina) {
      return res.status(404).json({ erro: 'Disciplina não encontrada.' });
    }

    await Disciplina.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Disciplina removida com sucesso!' });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao deletar disciplina.', detalhe: err.message });
  }
};

const editarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;

    const disciplina = await Disciplina.findByIdAndUpdate(
      id,
      { nome, descricao, dataInicio, dataFim, tarefas: tarefasIds },
      { new: true }
    );

    if (!disciplina) {
      return res.status(404).json({ erro: 'Disciplina não encontrada.' });
    }

    return res.status(200).json({
      message: 'Disciplina atualizada com sucesso!',
      disciplina,
    });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao editar disciplina.', detalhe: err.message });
  }
};

module.exports = { criarDisciplina, obterTodasDisciplinas, deletarDisciplina, editarDisciplina };

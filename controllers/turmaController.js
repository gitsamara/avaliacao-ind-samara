const Turma = require('../models/turma.js');

const criarTurma = async (req, res) => {
  try {
    const { nome, alunosIds, professorId } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'O nome da turma é obrigatório.' });
    }

    const novaTurma = new Turma({ nome, alunos: alunosIds || [], professor: professorId });
    await novaTurma.save();

    return res.status(201).json({ message: 'Turma criada com sucesso!', turma: novaTurma });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao criar turma.', detalhe: err.message });
  }
};

const obterTodasTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find().populate('alunos professor');
    return res.status(200).json(turmas);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar turmas.', detalhe: err.message });
  }
};

const deletarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const turma = await Turma.findById(id);
    if (!turma) return res.status(404).json({ erro: 'Turma não encontrada.' });

    await Turma.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Turma removida com sucesso!' });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao deletar turma.', detalhe: err.message });
  }
};

const editarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, alunosIds, professorId } = req.body;

    const turma = await Turma.findByIdAndUpdate(
      id,
      { nome, alunos: alunosIds, professor: professorId },
      { new: true }
    );

    if (!turma) return res.status(404).json({ erro: 'Turma não encontrada.' });

    return res.status(200).json({ message: 'Turma atualizada com sucesso!', turma });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao editar turma.', detalhe: err.message });
  }
};

module.exports = { criarTurma, obterTodasTurmas, deletarTurma, editarTurma };

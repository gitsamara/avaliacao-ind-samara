const Professor = require('../models/professor.js');

const criarProfessor = async (req, res) => {
  try {
    const { nome, idade, disciplinasIds } = req.body;

    if (!nome || !idade) {
      return res.status(400).json({ erro: 'Nome e idade são obrigatórios.' });
    }

    const novoProfessor = new Professor({ nome, idade, disciplinas: disciplinasIds || [] });
    await novoProfessor.save();

    return res.status(201).json({ message: 'Professor criado com sucesso!', professor: novoProfessor });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao criar professor.', detalhe: err.message });
  }
};

const obterTodosProfessores = async (req, res) => {
  try {
    const professores = await Professor.find().populate('disciplinas');
    return res.status(200).json(professores);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar professores.', detalhe: err.message });
  }
};

const deletarProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await Professor.findById(id);
    if (!professor) return res.status(404).json({ erro: 'Professor não encontrado.' });

    await Professor.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Professor removido com sucesso!' });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao deletar professor.', detalhe: err.message });
  }
};

const editarProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, disciplinasIds } = req.body;

    const professor = await Professor.findByIdAndUpdate(
      id,
      { nome, idade, disciplinas: disciplinasIds },
      { new: true }
    );

    if (!professor) return res.status(404).json({ erro: 'Professor não encontrado.' });

    return res.status(200).json({ message: 'Professor atualizado com sucesso!', professor });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao editar professor.', detalhe: err.message });
  }
};

module.exports = { criarProfessor, obterTodosProfessores, deletarProfessor, editarProfessor };

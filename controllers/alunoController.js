const Aluno = require('../models/aluno.js');

const criarAluno = async (req, res) => {
  try {
    const { nome, idade } = req.body;

    if (!nome || !idade) {
      return res.status(400).json({ erro: 'Nome e idade são obrigatórios.' });
    }

    const novoAluno = new Aluno({ nome, idade });
    await novoAluno.save();

    return res.status(201).json({
      message: 'Aluno criado com sucesso!',
      aluno: novoAluno,
    });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao criar aluno.', detalhe: err.message });
  }
};

const obterTodosAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find().populate('perfil');
    return res.status(200).json(alunos);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar alunos.', detalhe: err.message });
  }
};

const deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;

    const aluno = await Aluno.findById(id);
    if (!aluno) {
      return res.status(404).json({ erro: 'Aluno não encontrado.' });
    }

    await Aluno.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Aluno removido com sucesso!' });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao deletar aluno.', detalhe: err.message });
  }
};

const editarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade } = req.body;

    const aluno = await Aluno.findByIdAndUpdate(
      id,
      { nome, idade },
      { new: true } // retorna o documento atualizado
    );

    if (!aluno) {
      return res.status(404).json({ erro: 'Aluno não encontrado.' });
    }

    return res.status(200).json({
      message: 'Aluno atualizado com sucesso!',
      aluno,
    });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao editar aluno.', detalhe: err.message });
  }
};

module.exports = { criarAluno, obterTodosAlunos, deletarAluno, editarAluno };

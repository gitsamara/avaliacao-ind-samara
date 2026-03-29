const Perfil = require('../models/perfil.js');
const Aluno = require('../models/aluno.js');

const criarPerfil = async (req, res) => {
  try {
    const { matricula, telefone, endereco, alunoId } = req.body;

    if (!alunoId) {
      return res.status(400).json({ erro: 'O ID do aluno é obrigatório.' });
    }

    const alunoExiste = await Aluno.findById(alunoId);
    if (!alunoExiste) {
      return res.status(404).json({ erro: 'Aluno não encontrado.' });
    }

    const novoPerfil = new Perfil({ matricula, telefone, endereco, aluno: alunoId });
    await novoPerfil.save();

    await Aluno.updateOne({ _id: alunoId }, { $set: { perfil: novoPerfil._id } });

    return res.status(201).json({ message: 'Perfil criado com sucesso!', perfil: novoPerfil });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao criar perfil.', detalhe: err.message });
  }
};

const obterTodosPerfis = async (req, res) => {
  try {
    const perfis = await Perfil.find().populate('aluno');
    return res.status(200).json(perfis);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar perfis.', detalhe: err.message });
  }
};

const deletarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const perfil = await Perfil.findById(id);
    if (!perfil) return res.status(404).json({ erro: 'Perfil não encontrado.' });

    await Perfil.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Perfil removido com sucesso!' });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao deletar perfil.', detalhe: err.message });
  }
};

const editarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { matricula, telefone, endereco, alunoId } = req.body;

    const perfil = await Perfil.findByIdAndUpdate(
      id,
      { matricula, telefone, endereco, aluno: alunoId },
      { new: true }
    );

    if (!perfil) return res.status(404).json({ erro: 'Perfil não encontrado.' });

    return res.status(200).json({ message: 'Perfil atualizado com sucesso!', perfil });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao editar perfil.', detalhe: err.message });
  }
};

module.exports = { criarPerfil, obterTodosPerfis, deletarPerfil, editarPerfil };

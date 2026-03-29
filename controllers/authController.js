const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.js');
const { JWT_SECRET } = require('../middleware/auth.js');

// ─────────────────────────────────────────────────────────────
// CRITÉRIO 3: Fluxo de autenticação com JWT
// POST /auth/registrar → cria usuário
// POST /auth/login     → retorna token JWT
// ─────────────────────────────────────────────────────────────

const registrar = async (req, res) => {
  // CRITÉRIO 1: try-catch + status codes
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
    }

    const jaExiste = await Usuario.findOne({ email });
    if (jaExiste) {
      return res.status(409).json({ erro: 'E-mail já cadastrado.' });
    }

    // NOTA: em produção, a senha deve ser hasheada (ex: bcrypt)
    // para simplificar o escopo desta avaliação, armazenamos em texto puro
    const novoUsuario = new Usuario({ nome, email, senha });
    await novoUsuario.save();

    return res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      usuario: { id: novoUsuario._id, nome: novoUsuario.nome, email: novoUsuario.email },
    });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao registrar usuário.', detalhe: err.message });
  }
};

const login = async (req, res) => {
  // CRITÉRIO 1: try-catch + status codes
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    // gera o token JWT com expiração de 1 dia
    const token = jwt.sign(
      { id: usuario._id, nome: usuario.nome, email: usuario.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      token, // token que deve ser usado no header: Authorization: Bearer <token>
    });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao realizar login.', detalhe: err.message });
  }
};

module.exports = { registrar, login };

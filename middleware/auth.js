const jwt = require('jsonwebtoken');

const JWT_SECRET = 'segredo_super_secreto_avaliacao_2024';

// ─────────────────────────────────────────────
// CRITÉRIO 3: middleware de autenticação JWT
// todas as rotas que usarem este middleware
// só poderão ser acessadas com um token válido
// ─────────────────────────────────────────────

const autenticarToken = (req, res, next) => {
  // CRITÉRIO 1: try-catch + status codes adequados
  try {
    const authHeader = req.headers['authorization'];

    // o header deve vir no formato: "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        erro: 'Token não fornecido. Acesso negado.',
      });
    }

    const token = authHeader.split(' ')[1];

    // verifica e decodifica o token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded; // disponibiliza os dados do usuário na requisição
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ erro: 'Token expirado. Faça login novamente.' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ erro: 'Token inválido.' });
    }
    return res.status(500).json({ erro: 'Erro interno ao verificar token.' });
  }
};

module.exports = { autenticarToken, JWT_SECRET };

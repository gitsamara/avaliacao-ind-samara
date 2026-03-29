const express = require('express');
const app = express();

// conexão com o banco de dados
require('./config/db.js');

// middleware para parsear JSON
app.use(express.json());

// ─────────────────────────────────────────────────────────────
// ROTAS PÚBLICAS (sem autenticação)
// ─────────────────────────────────────────────────────────────

app.use('/auth', require('./routes/authRoutes.js'));

// ─────────────────────────────────────────────────────────────
// CRITÉRIO 3: ROTAS PROTEGIDAS (exigem token JWT)
// para acessar qualquer rota abaixo, é necessário enviar:
// Header: Authorization: Bearer <token>
// o token é obtido fazendo POST em /auth/login
// ─────────────────────────────────────────────────────────────

app.use('/', require('./routes/alunoRoutes.js'));
app.use('/', require('./routes/perfilRoutes.js'));
app.use('/', require('./routes/disciplinaRoutes.js'));
app.use('/', require('./routes/professorRoutes.js'));
app.use('/', require('./routes/tarefaRoutes.js'));
app.use('/', require('./routes/turmaRoutes.js'));

// rota padrão para URLs não encontradas
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

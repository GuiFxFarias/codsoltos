const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(bodyParser.json());
server.use(cookieParser());
server.use(middlewares);

const SECRET_KEY = '01110111';

// Middleware para verificar token
function verifyToken(req, res, next) {
  const token = req.cookies.authToken;

  if (!token) {
    return res
      .status(403)
      .json({ error: 'Acesso negado. Token não encontrado.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido ou expirado.' });
  }
}

// Rota protegida para cryptoDash
server.get('/cryptoDash', verifyToken, (req, res) => {
  res
    .status(200)
    .json({ message: 'Bem-vindo à página CryptoDash!', user: req.user });
});

// Rota de login com persistência do token
server.post('/loginDashboards', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  const user = db.get('users').find({ email, password }).value();

  if (user) {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: '1h',
    });

    // Salvar token no `db.json`
    const tokensCollection = db.get('tokens');
    tokensCollection.push({ id: user.id, token }).write(); // Garante que o token será salvo

    // Configurar o cookie com o token
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false, // Defina como true em produção com HTTPS
      maxAge: 3600000, // 1 hora
      sameSite: 'strict',
      path: '/',
    });

    res.status(200).json({ message: 'Login realizado com sucesso!' });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

server.use(router);
server.listen(3333, () => {
  console.log('JSON Server está rodando em http://localhost:3333');
});

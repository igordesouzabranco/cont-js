require('dotenv').config();

if (!process.env.SESSION_SECRET) {
  console.error('SESSION_SECRET não definido no ambiente.');
  process.exit(1);
}

const express = require('express');
const app = express();
app.set('trust proxy', 1);

const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    app.emit('pronto');
  })
  .catch(err => {
    console.error('Erro ao conectar:', err);
    process.exit(1);
  });

const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const { csrfSync } = require('csrf-sync');
const { csrfSynchronisedProtection } = csrfSync({
  getTokenFromRequest: (req) => req.body._csrf,
});

const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middleware/middleware');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com", "cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", "cdn.jsdelivr.net"],
    }
  }
}));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.on('pronto', () => {
  const port = process.env.PORT || 3000;
  const sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    }
  });

  // 1. Inicializa Sessão e Flash Messages
  app.use(sessionOptions);
  app.use(flash());

  // 2. Proteção CSRF básica
  app.use(csrfSynchronisedProtection);

  // 3. Middlewares de Segurança e Injeção de Variáveis Globais (Essencial para as mensagens)
  app.use(checkCsrfError);      // Captura erros de CSRF antes das rotas
  app.use(csrfMiddleware);      // Injeta o csrfToken nas Views
  app.use(middlewareGlobal);    // Injeta os arrays de 'errors' e 'success' nas Views

  // 4. Execução das Rotas do Sistema
  app.use(routes);

  app.use((req, res) => {
    return res.status(404).render('404');
  });

  app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).render('500');
  });

  // 5. Inicialização do Servidor
  app.listen(port, () => {
    console.info(`Servidor está rodando na porta ${port}!`);
  });
});

# ContJS

**Aplicação web em Node.js para gerenciar contatos pessoais, com autenticação, proteção CSRF e deploy no Render.**

[![Node.js](https://camo.githubusercontent.com/ef2b7d0db96aa537dfc682bc36181a27a9152e23378bd002a4331e9e2b27da5b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732d3644413535463f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465)](https://nodejs.org/) [![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) [![JavaScript](https://camo.githubusercontent.com/88b8bdce872268b3d0d7ec69e16716a0adf8fa0165eb6069bcb49e23bd5550ef/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d4637444631453f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) [![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

---

**[Site ao vivo](https://cont-js.onrender.com/)** | **[Repositório](https://github.com/igordesouzabranco/cont-js)**

---

## Sobre o projeto

ContJS é uma aplicação full stack desenvolvida em Node.js para gerenciar uma agenda de contatos. O projeto utiliza Express + EJS no backend, MongoDB Atlas para persistência, sessões com `express-session` + `connect-mongo`, proteção CSRF via `csrf-sync` e build de assets do frontend com Webpack + Babel.

## Funcionalidades

- **Autenticação de usuários** — registro e login com senhas criptografadas (bcrypt)
- **Sessão persistida no MongoDB** — conecta automaticamente via connect-mongo
- **Proteção CSRF** — formulários protegidos com csrf-sync
- **Mensagens flash** — notificações de sucesso e erro em tempo real
- **CRUD de contatos** — criar, editar, listar e excluir contatos
- **Isolamento por usuário** — cada usuário visualiza apenas seus próprios contatos (multi-tenant)
- **Importação e exportação** — suporte a JSON e TXT para backup e restauração
- **Build de assets** — bundle otimizado via Webpack + Babel
- **Segurança** — Helmet (CSP), compression e rate limiting
- **Deploy no Render** — configurado para produção com variáveis de ambiente

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
|---|---|
| Node.js + Express | Backend e rotas HTTP |
| EJS | Templates server-side |
| MongoDB Atlas + Mongoose | Persistência de dados |
| express-session + connect-mongo | Sessões com armazenamento no MongoDB |
| csrf-sync | Proteção contra ataques CSRF |
| connect-flash | Mensagens flash (sucesso/erro) |
| Helmet | Segurança HTTP (CSP) |
| compression | Compressão de respostas |
| bcryptjs | Hash de senhas |
| Webpack + Babel | Bundle e transpilação do frontend |
| Render | Hospedagem e deploy |

## Habilidades demonstradas

| Funcionalidade | Competência técnica |
|---|---|
| Autenticação com bcrypt | Criptografia, hash de senhas, segurança de dados |
| Sessões com connect-mongo | Gerenciamento de estado servidor, persistência no MongoDB |
| Proteção CSRF | Segurança web, tokens sincronizados |
| CRUD completo | Operações HTTP REST, validação de entrada |
| Isolamento multi-tenant | Modelagem de dados, query por usuário |
| Importação/exportação | Manipulação de arquivos JSON/TXT, parsing de dados |
| Deploy no Render | CI/CD, variáveis de ambiente, configuração de produção |
| Helmet CSP | Segurança de cabeçalhos HTTP, política de conteúdo |

## Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/igordesouzabranco/cont-js.git

# Entre na pasta do projeto
cd cont-js

# Instale as dependências
npm install

# Crie um arquivo .env na raiz com:
# CONNECTION_STRING="sua-connection-string-do-mongodb"
# SESSION_SECRET="um-segredo-longo-e-aleatorio"
# NODE_ENV="development"

# Build do frontend (em um terminal)
npm run dev

# Suba o servidor (em outro terminal)
npm run start:dev
```

Abra `http://localhost:3000` no navegador.

## Deploy no Render

### MongoDB Atlas

- Crie um cluster no Atlas
- Em **Network Access**, libere o IP `0.0.0.0/0`
- Copie a connection string e use como `CONNECTION_STRING`

### Render

Crie um **Web Service** apontando para este repositório:

- **Build Command:** `npm install --include=dev && npm run build`
- **Start Command:** `node server.js`
- **Environment Variables:**
  - `CONNECTION_STRING`
  - `SESSION_SECRET`
  - `NODE_ENV=production`

## Estrutura de pastas

- `server.js` — bootstrap do servidor Express + middlewares + conexão MongoDB
- `routes.js` — rotas principais do app
- `src/controllers/` — controllers (login, home, contato)
- `src/models/` — models (Mongoose + validação)
- `src/views/` — views EJS
- `src/middleware/` — middlewares globais (login, csrf, flash)
- `frontend/` — código frontend empacotado via Webpack
- `public/` — arquivos estáticos servidos pelo Express

## Contato

- **Email:** [igordesouzabranco@gmail.com](mailto:igordesouzabranco@gmail.com)
- **GitHub:** [igordesouzabranco](https://github.com/igordesouzabranco)
- **LinkedIn:** [Igor de Souza Branco](https://linkedin.com/in/igor-de-souza-branco-b68630314)

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

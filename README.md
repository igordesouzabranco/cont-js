# ContJS

**Aplicacao web em Node.js para gerenciar contatos pessoais, com autenticacao, protecao CSRF e deploy no Render.**

[![Node.js](https://camo.githubusercontent.com/ef2b7d0db96aa537dfc682bc36181a27a9152e23378bd002a4331e9e2b27da5b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732d3644413535463f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465)](https://nodejs.org/) [![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) [![JavaScript](https://camo.githubusercontent.com/88b8bdce872268b3d0d7ec69e16716a0adf8fa0165eb6069bcb49e23bd5550ef/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d4637444631453f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) [![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/) [![License: MIT](https://camo.githubusercontent.com/7a1226d14a365d288bfe51ece915ee0c7e754a16faa51ff06436504de29b33b4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d79656c6c6f772e7376673f7374796c653d666f722d7468652d6261646765)](https://opensource.org/licenses/MIT)

---

**[Site ao vivo](https://cont-js.onrender.com/)** | **[Repositorio](https://github.com/igordesouzabranco/cont-js)**

---

## Sobre o projeto

ContJS e uma aplicacao full stack desenvolvida em Node.js para gerenciar uma agenda de contatos. O projeto utiliza Express + EJS no backend, MongoDB Atlas para persistencia, sessoes com `express-session` + `connect-mongo`, protecao CSRF via `csrf-sync` e build de assets do frontend com Webpack + Babel.

## Funcionalidades

- **Autenticacao de usuarios** — registro e login com senhas criptografadas (bcrypt)
- **Sessao persistida no MongoDB** — conecta automaticamente via connect-mongo
- **Protecao CSRF** — formularios protegidos com csrf-sync
- **Mensagens flash** — notificacoes de sucesso e erro em tempo real
- **CRUD de contatos** — criar, editar, listar e excluir contatos
- **Isolamento por usuario** — cada usuario visualiza apenas seus proprios contatos (multi-tenant)
- **Importacao e exportacao** — suporte a JSON e TXT para backup e restauracao
- **Build de assets** — bundle otimizado via Webpack + Babel
- **Seguranca** — Helmet (CSP), compression e rate limiting
- **Deploy no Render** — configurado para producao com variaveis de ambiente

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
|---|---|
| Node.js + Express | Backend e rotas HTTP |
| EJS | Templates server-side |
| MongoDB Atlas + Mongoose | Persistencia de dados |
| express-session + connect-mongo | Sessoes com armazenamento no MongoDB |
| csrf-sync | Protecao contra ataques CSRF |
| connect-flash | Mensagens flash (sucesso/erro) |
| Helmet | Seguranca HTTP (CSP) |
| compression | Compressao de respostas |
| bcryptjs | Hash de senhas |
| Webpack + Babel | Bundle e transpilacao do frontend |
| Render | Hospedagem e deploy |

## Habilidades demonstradas

| Funcionalidade | Competencia tecnica |
|---|---|
| Autenticacao com bcrypt | Criptografia, hash de senhas, seguranca de dados |
| Sessoes com connect-mongo | Gerenciamento de estado servidor, persistencia no MongoDB |
| Protecao CSRF | Seguranca web, tokens sincronizados |
| CRUD completo | Operacoes HTTP REST, validacao de entrada |
| Isolamento multi-tenant | Modelagem de dados, query por usuario |
| Importacao/exportacao | Manipulacao de arquivos JSON/TXT, parsing de dados |
| Deploy no Render | CI/CD, variaveis de ambiente, configuracao de producao |
| Helmet CSP | Seguranca de cabecalhos HTTP, politica de conteudo |

## Como rodar localmente

```bash
# Clone o repositorio
git clone https://github.com/igordesouzabranco/cont-js.git

# Entre na pasta do projeto
cd cont-js

# Instale as dependencias
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

Crie um **Web Service** apontando para este repositorio:

- **Build Command:** `npm install --include=dev && npm run build`
- **Start Command:** `node server.js`
- **Environment Variables:**
  - `CONNECTION_STRING`
  - `SESSION_SECRET`
  - `NODE_ENV=production`

## Estrutura de pastas

- `server.js` — bootstrap do servidor Express + middlewares + conexao MongoDB
- `routes.js` — rotas principais do app
- `src/controllers/` — controllers (login, home, contato)
- `src/models/` — models (Mongoose + validacao)
- `src/views/` — views EJS
- `src/middleware/` — middlewares globais (login, csrf, flash)
- `frontend/` — codigo frontend empacotado via Webpack
- `public/` — arquivos estaticos servidos pelo Express

## Contato

- **Email:** [igordesouzabranco@gmail.com](mailto:igordesouzabranco@gmail.com)
- **GitHub:** [igordesouzabranco](https://github.com/igordesouzabranco)
- **LinkedIn:** [Igor de Souza Branco](https://linkedin.com/in/igor-de-souza-branco-b68630314)

## Licenca

Este projeto esta licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

# AgendaJS

AgendaJS é uma aplicação web em Node.js para gerenciar uma agenda de contatos com autenticação de usuário. O projeto usa Express + EJS no backend, MongoDB (Mongoose) para persistência, sessão via `express-session` + `connect-mongo`, proteção CSRF (`csrf-sync`) e build de frontend com Webpack + Babel.

## Funcionalidades

- Login e registro de usuário
- Sessão persistida no MongoDB (connect-mongo)
- Proteção CSRF nos formulários
- Mensagens flash (sucesso/erro)
- CRUD de contatos (criar, editar, listar e excluir)
- Bundle de assets do frontend via Webpack

## Stack técnica

- Node.js + Express
- EJS (views server-side)
- MongoDB Atlas + Mongoose
- express-session + connect-mongo
- csrf-sync + connect-flash
- Helmet (CSP) + compression
- Webpack + Babel

## Pré-requisitos

- Node.js >= 20
- Uma instância MongoDB (recomendado: MongoDB Atlas)

## Variáveis de ambiente

Crie um arquivo `.env` na raiz (não comite esse arquivo):

```bash
CONNECTION_STRING="sua-connection-string-do-mongodb"
SESSION_SECRET="um-segredo-longo-e-aleatorio"
NODE_ENV="development"
```

No deploy (Render), você vai configurar essas variáveis no painel do serviço.

## Rodando localmente

1) Clonar o repositório

2) Instalar dependências

```bash
npm install
```

3) Build do frontend (watch)

Em um terminal:

```bash
npm run dev
```

4) Subir o servidor

Em outro terminal:

```bash
npm run start:dev
```

Abra:

- http://localhost:3000

## Scripts do package.json

- `npm run start`: inicia o servidor (modo “produção”, usando `node server.js`)
- `npm run start:dev`: inicia o servidor com nodemon (modo desenvolvimento)
- `npm run dev`: Webpack em modo watch (rebuild automático do bundle)
- `npm run build`: build do Webpack em modo produção

## Deploy (Render + MongoDB Atlas)

### MongoDB Atlas

- Crie um cluster no Atlas
- Em **Network Access**, libere o IP `0.0.0.0/0` (necessário para o Render conseguir acessar)
- Copie a connection string e use como `CONNECTION_STRING`

### Render

Crie um **Web Service** apontando para este repositório.

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `CONNECTION_STRING`
  - `SESSION_SECRET`
  - `NODE_ENV=production`

Observações:

- O Render define `PORT` automaticamente. O servidor usa `process.env.PORT || 3000`.
- Se você adicionar fontes externas ou outros domínios externos no frontend, ajuste o CSP do Helmet em [server.js](file:///c:/Users/admin/Desktop/cursojs/ProjetoAgendaJS/server.js).

## Estrutura de pastas (visão geral)

- `server.js`: bootstrap do servidor Express + middlewares + conexão MongoDB
- `routes.js`: rotas principais do app
- `src/controllers/`: controllers (login, home, contato)
- `src/models/`: models (Mongoose + validação)
- `src/views/`: views EJS
- `src/middleware/`: middlewares globais (login, csrf, flash)
- `frontend/`: código frontend empacotado via Webpack
- `public/`: arquivos estáticos servidos pelo Express (inclui o bundle gerado)

## Autor

- Seu Nome Aqui


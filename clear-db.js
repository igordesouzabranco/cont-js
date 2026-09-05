require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

async function deleteAllUsers() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Conectado ao MongoDB');

        const LoginModel = mongoose.model('Login', new mongoose.Schema({
            email: String,
            phone: String,
            password: String
        }));

        const ContatoModel = mongoose.model('Contato', new mongoose.Schema({
            nome: String,
            nickname: String,
            email: String,
            phone: String,
            userId: mongoose.Schema.Types.ObjectId,
            createdAt: Date
        }));

        const usersResult = await LoginModel.deleteMany({});
        console.log(`Usuarios excluidos: ${usersResult.deletedCount}`);

        const contatosResult = await ContatoModel.deleteMany({});
        console.log(`Contatos excluidos: ${contatosResult.deletedCount}`);

        console.log('Banco de dados limpo com sucesso!');
        process.exit(0);
    } catch (err) {
        console.error('Erro ao limpar banco:', err);
        process.exit(1);
    }
}

deleteAllUsers();

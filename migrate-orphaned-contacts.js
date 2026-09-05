require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

async function migrateOrphanedContacts() {
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

        const orphaned = await ContatoModel.find({
            $or: [
                { userId: { $exists: false } },
                { userId: null }
            ]
        });

        if (orphaned.length === 0) {
            console.log('Nenhum contato órfão encontrado.');
            process.exit(0);
        }

        console.log(`Contatos órfãos encontrados: ${orphaned.length}`);

        const firstUser = await LoginModel.findOne();

        if (!firstUser) {
            console.error('Nenhum usuário encontrado no banco. Não é possível migrar.');
            process.exit(1);
        }

        console.log(`Usuário destino para migração: ${firstUser._id} (${firstUser.email || firstUser.phone})`);

        const result = await ContatoModel.updateMany(
            {
                $or: [
                    { userId: { $exists: false } },
                    { userId: null }
                ]
            },
            { $set: { userId: firstUser._id } }
        );

        console.log(`Contatos migrados com sucesso: ${result.modifiedCount}`);
        process.exit(0);
    } catch (err) {
        console.error('Erro na migração:', err);
        process.exit(1);
    }
}

migrateOrphanedContacts();

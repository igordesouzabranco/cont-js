const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    nickname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
    createdAt: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.prototype.register = async function(userId) {
    this.validate();
    if (this.errors.length > 0) return;

    this.body.userId = userId;
    this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.validate = function() {
    this.cleanUp();
        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('Email inválido.');
        }
        if (!this.body.nome) {
            this.errors.push('Nome é obrigatório.');
        }
        if (!this.body.email && !this.body.phone) {
            this.errors.push('Email ou Telefone são obrigatórios.');
        }
    
}

Contato.prototype.cleanUp = function() {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nome,
        nickname: this.body.nickname,
        email: this.body.email,
        phone: this.body.phone
    };
}

    
Contato.prototype.update = async function(id, userId) {
    if(typeof id !== 'string') return;
    this.validate();
    if (this.errors.length > 0) return;
    
    this.contato = await ContatoModel.findOneAndUpdate(
        { _id: id, userId },
        this.body,
        { returnDocument: 'after' }
    );
}

Contato.findById = async function(id, userId) {
    if (typeof id !== 'string') return null;
    try {
        const contato = await ContatoModel.findOne({ _id: id, userId });
        return contato;
    } catch (err) {
        console.error(err);
        return null;
    }
}

Contato.findContacts = async function(userId) {
    try {
        const contatos = await ContatoModel.find({ userId }).sort({ createdAt: -1 });
        return contatos;
    } catch (err) {
        console.error(err);
        return null;
    }
}

Contato.delete = async function(id, userId) {
    if (typeof id !== 'string') return null;
    try {
        const contato = await ContatoModel.findOneAndDelete({ _id: id, userId });
        return contato;
    } catch (err) {
        console.error(err);
        return null;
    }
}

Contato.importContacts = async function(contacts, userId) {
    const imported = [];
    for (const c of contacts) {
        const nome = (c.nome || c.name || '').trim();
        if (!nome) continue;

        const body = {
            nome,
            nickname: (c.nickname || c.apelido || '').trim(),
            email: (c.email || '').trim(),
            phone: (c.phone || c.telefone || '').trim(),
            userId
        };

        if (!body.email && !body.phone) continue;

        try {
            const created = await ContatoModel.create(body);
            imported.push(created);
        } catch (err) {
            console.error('Erro ao importar contato:', err);
        }
    }
    return imported;
}


module.exports = Contato;

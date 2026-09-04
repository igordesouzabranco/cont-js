const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.validate();
        if (this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push('Usuário ou senha inválidos.');
            return;
        }

        const passwordMatch = await bcrypt.compareSync(this.body.password, this.user.password);

        if (!passwordMatch) {
            this.errors.push('Senha inválida.');
            this.user = null;
            return;
        }

        this.user = this.user;
    }

    async register() {
        this.validate();
        if (this.errors.length > 0) return;

        await this.userExists();
        if (this.errors.length > 0) return;
        
        const salt = await bcrypt.genSaltSync();
        this.body.password = await bcrypt.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });

        if (this.user) {    
            this.errors.push('Usuário já existe.');
        }
    }

    

    validate() {
        this.cleanUp();
        if (!validator.isEmail(this.body.email)) {
            this.errors.push('Email inválido.');
        }
        if (this.body.password.length < 6 || this.body.password.length > 20) {
            this.errors.push('Senha deve ter pelo menos 6 caracteres e não pode ultrapassar 20 caracteres.');
        }

        
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login;
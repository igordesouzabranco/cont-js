const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
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
        this.cleanUpLogin();
        this.validateLogin();
        if (this.errors.length > 0) return;

        const loginValue = this.body.login;
        const isEmail = validator.isEmail(loginValue);
        const isPhone = this.isValidPhone(loginValue);

        let query = {};
        if (isEmail) {
            query = { email: loginValue.toLowerCase() };
        } else if (isPhone) {
            query = { phone: loginValue };
        } else {
            this.errors.push('Email ou telefone invalidos.');
            return;
        }

        this.user = await LoginModel.findOne(query);

        if (!this.user) {
            this.errors.push('Usuario ou senha invalidos.');
            return;
        }

        const passwordMatch = bcrypt.compareSync(this.body.password, this.user.password);

        if (!passwordMatch) {
            this.errors.push('Senha invalida.');
            this.user = null;
        }
    }

    async register() {
        this.cleanUpRegister();
        this.validateRegister();
        if (this.errors.length > 0) return;

        await this.userExists();
        if (this.errors.length > 0) return;

        await this.phoneUnique();
        if (this.errors.length > 0) return;

        const salt = bcrypt.genSaltSync();
        this.body.password = bcrypt.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async userExists() {
        const query = { $or: [] };
        if (this.body.email) query.$or.push({ email: this.body.email });
        if (this.body.phone) query.$or.push({ phone: this.body.phone });

        if (query.$or.length === 0) return;

        this.user = await LoginModel.findOne(query);
        if (this.user) {
            this.errors.push('Usuario ja existe.');
        }
    }

    async phoneUnique() {
        if (!this.body.phone) return;

        const existing = await LoginModel.findOne({ phone: this.body.phone });
        if (existing) {
            this.errors.push('Este telefone ja esta cadastrado.');
        }
    }

    isValidPhone(phone) {
        if (!phone) return false;
        const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
        return /^\d{8,15}$/.test(cleaned);
    }

    cleanUpLogin() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body.login = (this.body.login || '').trim();
        this.body.password = this.body.password || '';
    }

    validateLogin() {
        if (!this.body.login) {
            this.errors.push('Email ou telefone sao obrigatorios.');
        }
        if (!this.body.password || this.body.password.length < 6 || this.body.password.length > 20) {
            this.errors.push('Senha deve ter entre 6 e 20 caracteres.');
        }
    }

    cleanUpRegister() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            email: (this.body.email || '').trim().toLowerCase(),
            phone: (this.body.phone || '').trim(),
            password: this.body.password || ''
        };
    }

    validateRegister() {
        const hasEmail = this.body.email !== '';
        const hasPhone = this.body.phone !== '';

        if (!hasEmail && !hasPhone) {
            this.errors.push('Email ou telefone sao obrigatorios.');
        }

        if (hasEmail && !validator.isEmail(this.body.email)) {
            this.errors.push('Email invalido.');
        }

        if (hasPhone && !this.isValidPhone(this.body.phone)) {
            this.errors.push('Telefone invalido. Use apenas numeros com 8 a 15 digitos.');
        }

        if (!this.body.password || this.body.password.length < 6 || this.body.password.length > 20) {
            this.errors.push('Senha deve ter entre 6 e 20 caracteres.');
        }
    }
}

module.exports = Login;

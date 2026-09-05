import validator from 'validator';
import FormMessage from './FormMessage';

export default class LoginRegisterForm {
    constructor() {
        this.form = document.querySelector('.js-register-form');
        this.formMessage = null;
    }

    init() {
        if (!this.form) return;
        this.formMessage = new FormMessage(this.form);

        this.form.addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        const { errors, firstInvalidInput } = this.validate();
        if (errors.length === 0) return;

        e.preventDefault();
        this.formMessage.error(errors);
        if (firstInvalidInput) firstInvalidInput.focus();
    }

    isValidPhone(phone) {
        if (!phone) return false;
        const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
        return /^\d{8,15}$/.test(cleaned);
    }

    validate() {
        const errors = [];

        const emailInput = this.form.querySelector('input[name="email"]');
        const phoneInput = this.form.querySelector('input[name="phone"]');
        const passwordInput = this.form.querySelector('input[name="password"]');

        const email = (emailInput?.value || '').trim();
        const phone = (phoneInput?.value || '').trim();
        const password = passwordInput?.value || '';

        let firstInvalidInput = null;

        if (!email && !phone) {
            errors.push('Email ou telefone sao obrigatorios.');
            firstInvalidInput = firstInvalidInput || emailInput;
        }

        if (email && !validator.isEmail(email)) {
            errors.push('Email invalido.');
            firstInvalidInput = firstInvalidInput || emailInput;
        }

        if (phone && !this.isValidPhone(phone)) {
            errors.push('Telefone invalido. Use apenas numeros com 8 a 15 digitos.');
            firstInvalidInput = firstInvalidInput || phoneInput;
        }

        if (password.length < 6 || password.length > 20) {
            errors.push('Senha deve ter entre 6 e 20 caracteres.');
            firstInvalidInput = firstInvalidInput || passwordInput;
        }

        return { errors, firstInvalidInput };
    }
}

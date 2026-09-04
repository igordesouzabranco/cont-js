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

    validate() {
        const errors = [];

        const emailInput = this.form.querySelector('input[name="email"]');
        const passwordInput = this.form.querySelector('input[name="password"]');

        const email = (emailInput?.value || '').trim();
        const password = passwordInput?.value || '';

        let firstInvalidInput = null;

        if (!validator.isEmail(email)) {
            errors.push('Email inválido.');
            firstInvalidInput = firstInvalidInput || emailInput;
        }

        if (password.length < 6 || password.length > 20) {
            errors.push('Senha deve ter pelo menos 6 caracteres e não pode ultrapassar 20 caracteres.');
            firstInvalidInput = firstInvalidInput || passwordInput;
        }

        return { errors, firstInvalidInput };
    }
}


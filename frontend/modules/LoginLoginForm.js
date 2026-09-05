import FormMessage from './FormMessage';

export default class LoginLoginForm {
    constructor() {
        this.form = document.querySelector('.js-login-form');
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

        const loginInput = this.form.querySelector('input[name="login"]');
        const passwordInput = this.form.querySelector('input[name="password"]');

        const login = (loginInput?.value || '').trim();
        const password = passwordInput?.value || '';

        let firstInvalidInput = null;

        if (!login) {
            errors.push('Email ou telefone sao obrigatorios.');
            firstInvalidInput = firstInvalidInput || loginInput;
        }

        if (password.length < 6 || password.length > 20) {
            errors.push('Senha deve ter entre 6 e 20 caracteres.');
            firstInvalidInput = firstInvalidInput || passwordInput;
        }

        return { errors, firstInvalidInput };
    }
}

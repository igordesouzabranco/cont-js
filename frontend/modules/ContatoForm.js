import validator from 'validator';
import FormMessage from './FormMessage';

export default class ContatoForm {
    constructor() {
        this.form = document.querySelector('.js-contato-form');
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

        const nomeInput = this.form.querySelector('input[name="nome"]');
        const emailInput = this.form.querySelector('input[name="email"]');
        const phoneInput = this.form.querySelector('input[name="phone"]');

        const nome = (nomeInput?.value || '').trim();
        const email = (emailInput?.value || '').trim();
        const phone = (phoneInput?.value || '').trim();

        let firstInvalidInput = null;

        if (!nome) {
            errors.push('Nome é obrigatório.');
            firstInvalidInput = firstInvalidInput || nomeInput;
        }

        if (email && !validator.isEmail(email)) {
            errors.push('Email inválido.');
            firstInvalidInput = firstInvalidInput || emailInput;
        }

        if (!email && !phone) {
            errors.push('Email ou Telefone são obrigatórios.');
            firstInvalidInput = firstInvalidInput || emailInput || phoneInput;
        }

        return { errors, firstInvalidInput };
    }
}


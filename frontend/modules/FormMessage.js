export default class FormMessage {
    constructor(form) {
        this.form = form;
        this.container = null;
    }

    ensureContainer() {
        if (this.container && this.container.isConnected) return;
        if (!this.form || !this.form.parentNode) return;

        this.container = document.createElement('div');
        this.container.classList.add('js-validation-messages');
        this.form.parentNode.insertBefore(this.container, this.form);
    }

    clear() {
        if (!this.container) return;
        while (this.container.firstChild) this.container.removeChild(this.container.firstChild);
    }

    error(messages) {
        this.ensureContainer();
        if (!this.container) return;

        this.clear();

        messages.forEach((message) => {
            const row = document.createElement('div');
            row.classList.add('row');

            const col = document.createElement('div');
            col.classList.add('col', 'my-2');

            const alert = document.createElement('div');
            alert.classList.add('alert', 'alert-danger');
            alert.textContent = message;

            col.appendChild(alert);
            row.appendChild(col);
            this.container.appendChild(row);
        });
    }
}


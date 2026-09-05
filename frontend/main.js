import './assets/css/style.css';
import 'regenerator-runtime/runtime';

import LoginRegisterForm from './modules/LoginRegisterForm';
import LoginLoginForm from './modules/LoginLoginForm';
import ContatoForm from './modules/ContatoForm';

const loginRegisterForm = new LoginRegisterForm();
loginRegisterForm.init();

const loginLoginForm = new LoginLoginForm();
loginLoginForm.init();

const contatoForm = new ContatoForm();
contatoForm.init();

const btnShowLogin = document.getElementById('btn-show-login');
const btnShowRegister = document.getElementById('btn-show-register');
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');

if (btnShowLogin && loginSection && registerSection) {
    btnShowLogin.addEventListener('click', function() {
        loginSection.style.display = 'block';
        registerSection.style.display = 'none';
    });
}

if (btnShowRegister && loginSection && registerSection) {
    btnShowRegister.addEventListener('click', function() {
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
    });
}

const importInput = document.getElementById('import-file');

if (importInput) {
    importInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(evt) {
            const content = evt.target.result;
            let contacts = [];

            if (file.name.endsWith('.json')) {
                try {
                    contacts = JSON.parse(content);
                } catch (err) {
                    alert('Arquivo JSON invalido.');
                    return;
                }
            } else if (file.name.endsWith('.txt')) {
                const lines = content.split('\n').filter(l => l.trim());
                lines.forEach(line => {
                    if (line.startsWith('Nome') || line.startsWith('---')) return;
                    const parts = line.split('|').map(p => p.trim());
                    if (parts.length >= 4) {
                        contacts.push({
                            nome: parts[0],
                            nickname: parts[1],
                            phone: parts[2],
                            email: parts[3]
                        });
                    }
                });
            } else {
                alert('Formato nao suportado. Use .json ou .txt');
                return;
            }

            if (contacts.length === 0) {
                alert('Nenhum contato encontrado no arquivo.');
                return;
            }

            const csrfMeta = document.querySelector('meta[name="csrf-token"]');
            const csrfToken = csrfMeta ? csrfMeta.getAttribute('content') : '';

            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/contato/import';

            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_csrf';
            csrfInput.value = csrfToken;
            form.appendChild(csrfInput);

            const contactsInput = document.createElement('input');
            contactsInput.type = 'hidden';
            contactsInput.name = 'contacts';
            contactsInput.value = JSON.stringify(contacts);
            form.appendChild(contactsInput);

            document.body.appendChild(form);
            form.submit();
        };
        reader.readAsText(file);
        importInput.value = '';
    });
}

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


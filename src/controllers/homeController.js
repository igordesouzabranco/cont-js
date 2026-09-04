const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
    const contatos = await Contato.findContacts();
    res.render('index', { contatos });
};

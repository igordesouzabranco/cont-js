const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
    if (!req.session.user) {
        return res.render('index', { contatos: [] });
    }
    const contatos = await Contato.findContacts(req.session.user._id);
    res.render('index', { contatos });
};

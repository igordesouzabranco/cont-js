const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato', { contato: {} });
}

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register(req.session.user._id);

    if (contato.errors.length > 0) {
        req.flash('errors', contato.errors);
        return res.redirect('/contato/index');
    }
    
    req.flash('success', 'Contato registrado com sucesso!');
    req.session.save(() => res.redirect(`/contato/index/${contato.contato.id}`));
    }   catch (err) {
        console.error(err);
        return res.render('404');
    }
}

exports.editIndex = async (req, res) => {
    if(!req.params.id) {
        return res.render('404');
    }

    const contato = await Contato.findById(req.params.id, req.session.user._id);
    if (!contato) {
        return res.render('404');
    }

    res.render('contato', { contato });
}

exports.update = async (req, res) => {
    try {
        if(!req.params.id) {
            return res.render('404');
        }

        const contato = new Contato(req.body);
        await contato.update(req.params.id, req.session.user._id);

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            return res.redirect('/contato/index');
        }
        if (!contato.contato) {
            return res.render('404');
        }
        req.flash('success', 'Contato atualizado com sucesso!');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato.id}`));
    } catch (err) {
        console.error(err);
        return res.render('404');
    }
}

exports.delete = async (req, res) => {
    if(!req.params.id) {
        return res.render('404');
    }

    const contato = await Contato.delete(req.params.id, req.session.user._id);    
    if (!contato) {
        return res.render('404');
    }
    
    req.flash('success', 'Contato excluído com sucesso!');
    req.session.save(() => res.redirect('/'));
}

exports.exportJson = async (req, res) => {
    const contatos = await Contato.findContacts(req.session.user._id);
    const data = contatos.map(c => ({
        nome: c.nome,
        nickname: c.nickname,
        email: c.email,
        phone: c.phone
    }));
    res.setHeader('Content-Disposition', 'attachment; filename=contatos.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data, null, 2));
}

exports.exportTxt = async (req, res) => {
    const contatos = await Contato.findContacts(req.session.user._id);
    let txt = 'Nome | Apelido | Telefone | Email\n';
    txt += '-----------------------------------\n';
    contatos.forEach(c => {
        txt += `${c.nome} | ${c.nickname} | ${c.phone} | ${c.email}\n`;
    });
    res.setHeader('Content-Disposition', 'attachment; filename=contatos.txt');
    res.setHeader('Content-Type', 'text/plain');
    res.send(txt);
}

exports.importContacts = async (req, res) => {
    try {
        let contacts = req.body.contacts;
        if (typeof contacts === 'string') {
            contacts = JSON.parse(contacts);
        }
        if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
            req.flash('errors', 'Nenhum contato para importar.');
            return req.session.save(() => res.redirect('/'));
        }

        const imported = await Contato.importContacts(contacts, req.session.user._id);
        req.flash('success', `${imported.length} contato(s) importado(s) com sucesso!`);
        req.session.save(() => res.redirect('/'));
    } catch (err) {
        console.error(err);
        req.flash('errors', 'Erro ao importar contatos.');
        req.session.save(() => res.redirect('/'));
    }
}

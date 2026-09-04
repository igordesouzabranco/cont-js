const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato', { contato: {} });
}

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

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

    const contato = await Contato.findById(req.params.id);
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
        await contato.update(req.params.id);

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            return res.redirect('/contato/index');
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

    const contato = await Contato.delete(req.params.id);    
    if (!contato) {
        return res.render('404');
    }
    
    req.flash('success', 'Contato excluído com sucesso!');
    req.session.save(() => res.redirect('/'));
}

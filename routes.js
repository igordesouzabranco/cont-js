const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const contatoController = require('./src/controllers/contatoController');
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

const { checkLogin } = require('./src/middleware/middleware');

const loginRateLimitHandler = (req, res, next, options) => {
  req.flash('errors', options.message);
  req.session.save(() => res.redirect('/login/index'));
};

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Muitas tentativas de cadastro. Aguarde um pouco e tente novamente.',
  handler: loginRateLimitHandler
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Muitas tentativas de login. Aguarde um pouco e tente novamente.',
  handler: loginRateLimitHandler
});



router.get('/', homeController.index);

router.get('/login/index', loginController.index);
router.post('/login/register', registerLimiter, loginController.register);
router.post('/login/login', loginLimiter, loginController.login);
router.get('/login/logout', loginController.logout);

router.get('/contato/index', checkLogin, contatoController.index);
router.post('/contato/register', checkLogin, contatoController.register);
router.get('/contato/index/:id', checkLogin, contatoController.editIndex);
router.post('/contato/update/:id', checkLogin, contatoController.update);
router.get('/contato/delete/:id', checkLogin, contatoController.delete);



module.exports = router;

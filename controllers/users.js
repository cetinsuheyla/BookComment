const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
  res.render('users/register');
}

module.exports.register = async(req, res, next) => {
try{
  const {email, username, password} = req.body;
  const user = await new User({email, username});
  registeredUser = await User.register(user, password);
  req.login(registeredUser, err => {
    if(err) return next(err);
    req.flash('success', 'Welcome to BookOmment, where the ideas matter!');
    res.redirect('/books');
  })
} catch(e){
  req.flash('error', e.message);
  res.redirect('/register');
}
}


module.exports.renderLoginForm = (req, res) => {
  res.render('users/login');
}

module.exports.login = async(req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectUrl = req.session.returnTo || '/books';
  res.redirect(redirectUrl);
  delete req.session.returnTo;
}

module.exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'Succesfully logged out. See you next time!');
  res.redirect('/');
}

const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');
const catchAsync = require('../helpers/catchAsync');
const users = require('../controllers/users');
const ExpressError = require('../helpers/ExpressError');

router.route('/register')
  .get(users.renderRegisterForm)
  .post(catchAsync(users.register))

router.route('/login')
  .get(users.renderLoginForm)
  .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), catchAsync(users.login))

router.get('/logout', users.logout)

module.exports = router;

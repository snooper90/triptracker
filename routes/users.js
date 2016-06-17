var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var days = require('./days');
var router = express.Router();

//sign up form (not currently in use)
router.get('/new', function(req, res) {
    res.render('auth/register');
});
// save new user
router.post('/register', function(req, res) {
  User.register(new User({ email: req.body.email }), req.body.password, function(err, user) {
      if (err) {
        console.log(err);
        return res.render('auth/register', { user : user });
      };
      passport.authenticate('local')(req, res, function () {
        res.redirect('/trips');
      });
  });
});
//sign up form (not currently in use)

router.get('/login', function(req, res) {
    res.render('auth/login');
});

//login request
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/trips');
});

//logout request
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/')
});


module.exports = router;

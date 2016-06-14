var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();



  router.get('/', function (req, res) {
      res.render('index');
  });

  router.get('/register', function(req, res) {
      res.render('auth/register');
  });

  router.post('/register', function(req, res) {
    User.register(new User({ email: req.body.email }), req.body.password, function(err, user) {
        if (err) {
          console.log(user);
          console.log(err);
            return res.render('auth/register', { user : user });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
  });

  router.get('/login', function(req, res) {
      res.render('login', { user : req.user });
  });

  router.post('/login', passport.authenticate('local'), function(req, res) {
      res.redirect('/');
  });

  router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

module.exports = router;
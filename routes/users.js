var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    res.render('user/index', {users: users} )
  });

});

router.get('/new', function(req, res, next) {
  res.render('user/new');
});

router.post('/', function(req, res, next) {
  // create a new user
  var email = req.body.email;
  var password = req.body.password;

  var newUser = User({
    email: email,
    password: password
  });
  newUser.save(function(err) {
    if (err) throw err;

    res.send('user made')
  });

});


module.exports = router;

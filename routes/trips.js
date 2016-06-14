var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Trip = require('../models/trip');

router.use('/:tripId/days', require('./days'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('trip/index');
});

router.post('/', function(req, res, next) {
  var trip = new Trip({
    userId:req.user._id,
    name:req.body.name,
    start_date: req.body.start_date,
    end_date:req.body.end_date
  });
  trip.save(function(err){
    if (err){
      console.log(err)
      return res.render('trip/new', { trip : trip })
    }else{
      res.send('working');
    }
  })
});

router.get('/new', function(req, res, next) {
  res.render('trip/new');
});

module.exports = router;

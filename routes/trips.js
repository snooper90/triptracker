var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Trip = require('../models/trip');

router.use('/:tripId/days', require('./days'));

// show all current trips with current userId
router.get('/', function(req, res, next) {
  Trip.find({userId: req.user._id}, function(err, trips){
    res.render('trip/index', {trips:trips});
  })
});

router.post('/', function(req, res, next) {
  var trip = new Trip({
    userId:req.user._id,
    name:req.body.name,
    start_date: convertTime(new Date(req.body.start_date)),
    end_date:convertTime(new Date(req.body.end_date))
    });
  console.log("trip.js startdate: " + trip.start_date);
  console.log("trip.js enddate: " + trip.end_date);
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



function convertTime(day){
  console.log(typeof day);
  var utcTime = new Date(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate());
  return utcTime
}
module.exports = router;

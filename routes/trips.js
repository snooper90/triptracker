var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Trip = require('../models/trip');
var Day = require('../models/day')
router.use(function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
});

//nest days in the trips
router.use('/:tripId/days', require('./days'));

// show all current trips with current userId
router.get('/', function(req, res, next) {
  Trip.find({userId: req.user._id}).sort({date: 'desc'}).exec(function(err, trips){
    res.render('trip/index', {trips:trips});
  });
});

router.post('/', function(req, res, next) {
  var trip = new Trip({
    userId:req.user._id,
    name:req.body.name,
    start_date: convertTime(new Date(req.body.start_date)),
    end_date:convertTime(new Date(req.body.end_date))
    });
  trip.save(function(err, data){
    if (err){
      console.log(err)
      return res.render('trip/new', { trip : trip })
    }else{
      res.redirect('/trips/'+data._id+'/days');
    }
  })
});

router.get('/:_id/delete', function(req, res, next){
  Trip.find({ _id:req.params._id }).remove( function(err){
    console.log("delete trip err :" + err) ;
    Day.find({tripId: req.params._id}).remove(function(err){
      console.log("delete day err :" + err) ;
      res.redirect('/trips')
    })
  });
})

router.get('/new', function(req, res, next) {
  res.render('trip/new');
});

function convertTime(day){
  var utcTime = new Date(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate());
  return utcTime
}
module.exports = router;

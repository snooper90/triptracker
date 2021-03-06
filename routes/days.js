var express = require('express');
var router = express.Router({mergeParams: true});
var request = require('request');
var googleKey = process.env.GOOGLE_MATRIX_KEY;
var Day = require('../models/day');
var Trip = require('../models/trip');

// auth middleware
router.use(function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    };
});

// show all days in a trip
router.get('/', function(req, res, next) {
  Day.find({tripId:req.params.tripId}).sort({date: 'ascending'}).exec(function(err, days) {
    Trip.findById(req.params.tripId, function(err, trip){
      res.render('day/index', {days: days, trip: trip});
    })
  })
});

// show specific day
router.get('/:_id', function(req, res, next) {
  Day.findById(req.params._id, function(err, day){
    if(day.destinations.address[1]){
      res.render('day/show', {day: day});
    }else{
      res.redirect('./'+ day._id +'/edit');
    }
  })
});

// view edit
router.get('/:_id/edit', function(req, res, next){
  var tripId = req.params.tripId;
  Day.findById(req.params._id, function(err, day){
    //TODO consider adding a prepopulated field as well
    var passIn = {day: day, tripId: tripId };
      res.render('day/first_edit', passIn);
  })
});

// clear the day of user inputed data
router.get('/:_id/clear', function(req, res, next){
  Day.findById(req.params._id, function(err, day){
    day.starting_point = '',
    day.destinations = {
        address: [],
        distances:[],
        discription:[]
    }
    day.save(function (err) {
      if (err) return handleError(err);
      // TODO reference body instead of req.params in the redirect of day post
      res.redirect('/trips/'+ req.params.tripId +'/days');
    });
  });
});

//TODO refactor PUT days
// had to change to post to accept html form
//TODO change front end sumbmits to AJAX to allow for more restful routing;
router.post('/:_id', function(req, res, next){
//get variables to send to googleAPI
  var startingPoint = encodeURIComponent(req.body.starting_location);
  //check to see if there is more than one waypoint
  if (typeof req.body.waypoints == 'string'){
    var endingPoint = encodeURIComponent(req.body.waypoints);
    var waypoints = [];
  }else{
    var endingPoint = encodeURIComponent(req.body.waypoints.pop());
    var waypoints = req.body.waypoints.map((waypoint) => encodeURIComponent(waypoint)).join('|');
  }
  var mapsUrl = 'https://maps.googleapis.com/maps/api/directions';
  var url = `${mapsUrl}/json?origin=${startingPoint}&destination=${endingPoint}&waypoints=${waypoints}&avoid=tolls&key=${googleKey}`;
//send the request to googleAPI
  request.get({url: url}, function(err, response, body){
    body = JSON.parse(body);
    //set variables for the day.destinations
    var address= [body.routes[0].legs[0].start_address];
    var discription= req.body.locationDiscription;
    var distance= [];

    for (var i = 0; i < body.routes[0].legs.length; i++){
      //TODO floor miles?
      distance.push(Math.floor(body.routes[0].legs[i].distance.value * 0.0006213711));
      address.push(body.routes[0].legs[i].end_address);
    };
    // find and then save the day
    Day.findById(req.params._id, function (err, day) {
      if (err) return handleError(err);
      day.destinations = {
        discription: discription,
        distances: distance,
        address: address
      }
      day.save(function (err) {
        if (err) return handleError(err);
        res.redirect('./' + req.params._id);
      });
    });
  });
});
module.exports = router;

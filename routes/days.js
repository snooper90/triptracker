var express = require('express');
var router = express.Router({mergeParams: true});
var request = require('request');
var googleKey = process.env.GOOGLE_MATRIX_KEY;
var Day = require('../models/day');
// show all days in a trip
router.get('/', function(req, res, next) {
  Day.find({tripId:req.params.tripId}, function(err, days){
    //TODO get all days of a trip view
    res.render('day/index', {days: days});
  })
});
// show specific day
router.get('/:_id', function(req, res, next) {
  Day.findById(req.params._id, function(err, day){
    //TODO get individual day view
    res.render('day/show', {day: day});
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
//TODO refactor PUT days
// had to change to post to accept html form
router.post('/:_id', function(req, res, next){
  var startingPoint = encodeURIComponent(req.body.starting_location);
  var endingPoint = encodeURIComponent(req.body.waypoints.pop());
  var waypoints = req.body.waypoints.map((waypoint) => encodeURIComponent(waypoint)).join('|');
  var mapsUrl = 'https://maps.googleapis.com/maps/api/directions';
  var url = `${mapsUrl}/json?origin=${startingPoint}&destination=${endingPoint}&waypoints=${waypoints}&avoid=tolls&key=${googleKey}`;
  request.get({url: url}, function(err, response, body){
    body = JSON.parse(body);
    var discription= req.body.locationDiscription;
    var distance= [];
    var address= [body.routes[0].legs[0].start_address];
    for (var i = 0; i < body.routes[0].legs.length; i++){
      //TODO floor miles?
      distance.push(body.routes[0].legs[i].distance.value * 0.0006213711);
      address.push(body.routes[0].legs[i].end_address);
    };
    // save the changes of the day
    Day.findById(req.params._id, function (err, day) {
      if (err) return handleError(err);
      day.destinations = {
        discription: discription,
        distances: distance,
        address: address
      }
      day.save(function (err) {
        if (err) return handleError(err);
        // TODO reference body instead of req.params in the redirect of day post
        res.redirect('./' + req.params._id);
      });
    });
  })
})
module.exports = router;

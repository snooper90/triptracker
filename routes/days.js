var express = require('express');
var router = express.Router({mergeParams: true});
var request = require('request');
var googleKey = process.env.GOOGLE_MATRIX_KEY;
var Day = require('../models/day');
/* GET home page. */
router.get('/', function(req, res, next) {
  Day.find({tripId:req.params.tripId}, function(err, days){
    res.send(days);
  })

});

router.get('/new', function(req, res, next) {

});

router.post('/', function(req, res, next) {
  // TODO:20 after outside api call working make it use request
  var startingPoint = encodeURIComponent(req.body.starting_location);
  var endingPoint = encodeURIComponent(req.body.waypoints.pop())
  var waypoints = req.body.waypoints.map((waypoint) => encodeURIComponent(waypoint)).join('|');
  var mapsUrl = 'https://maps.googleapis.com/maps/api/directions';
  var url = `${mapsUrl}/json?origin=${startingPoint}&destination=${endingPoint}&waypoints=${waypoints}&avoid=tolls&key=${googleKey}`
  res.send(body)
});
// view edit
router.get('/:_id/edit', function(req, res, next){
  Day.find({_id:req.params._id}, function(err, day){
    res.render('day/edit', {day: day});
  })

});
//edit the day
router.put('/:_id', function(req, res, next){
  request.get({url: url}, function(err, response, body){
    var discription= req.body.locationDiscription.split(',');
    var distance= [];
    var address= [routes[0].legs[0].start_address];
    for (var i = 0; i < routes[0].legs.length; i++){
      distance.push(routes[0].legs[i].distance);
      address.push(routes[0].legs[i].end_address);
    };
    Day.update({_id:req.params._id}, {
      destinations:{
        discription: discription,
        distances: distance,
        address: address
      }
    })
  })
})
module.exports = router;

var express = require('express');
var router = express.Router({mergeParams: true});
var request = require('request');
var googleKey = process.env.GOOGLE_MATRIX_KEY;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(req.params);
});

router.get('/new', function(req, res, next) {
  res.render('day/new', {tripId: req.params.tripId});
});
router.post('/', function(req, res, next) {
  // TODO:20 after outside api call working make it use request

  var startingPoint = encodeURIComponent(req.body.starting_location);
  var endingPoint = encodeURIComponent(req.body.waypoints.pop())
  var waypoints = req.body.waypoints.map((waypoint) => encodeURIComponent(waypoint)).join('|');
  var mapsUrl = 'https://maps.googleapis.com/maps/api/directions';
  var url = `${mapsUrl}/json?origin=${startingPoint}&destination=${endingPoint}&waypoints=${waypoints}&avoid=tolls&key=${googleKey}`

  request
    .get({url: url}, function(err, response, body){
      res.send(body)
    } )


});
module.exports = router;

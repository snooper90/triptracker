var express = require('express');
var router = express.Router();
var googleKey = process.env.GOOGLE_MATRIX_KEY;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(req.user);
});

//get the directions from google api
router.get('/', function(req, res, next) {
  var googleUrl = "https://maps.googleapis.com/maps/api/directions/json?";
  var origin = 'origin=' + req.body.origin;
  var waypoints = '&waypoints=via:' + req.body.waypoints;
  var destination = '&destination=' + req.body.destination;
  var requestUrl = googleUrl + origin + waypoints + destination + "&key=" + googleKey;
  res.json(req.user);
});


module.exports = router;

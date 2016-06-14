var express = require('express');
var router = express.Router({mergeParams: true});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(req.params);
});

module.exports = router;

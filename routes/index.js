var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/artists', function(req, res, next) {
  res.render('artists/artists-search');
});

router.get('/artists-results', function(req, res, next) {
  res.render('artists/artists-results');
});

router.get('/artist-details', function(req, res, next) {
  res.render('artists/artist-details');
});
module.exports = router;

var express = require('express');
var router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

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

router.get('/venues', function(req, res, next) {
  res.render('venues/venues-browse');
});

router.get('/venue-events', function(req, res, next) {
  res.render('venues/venue-events');
});

router.get('/venue-tickets', function(req, res, next) {
  res.render('venues/venue-tickets');
});

module.exports = router;

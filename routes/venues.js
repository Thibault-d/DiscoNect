var express = require('express');
var router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

var client = new MapboxClient(process.env.MAPBOX_TOKEN);

router.get('/', function (req, res, next) {
   res.render("venues/venues-browse")});

module.exports = router;
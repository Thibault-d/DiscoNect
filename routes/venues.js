var express = require('express');
var router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

router.get('/', function (req, res, next) { 
    res.render("venues/venues-browse")
});

module.exports = router;
var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

// Spotify connection
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

//routes 
router.get('/', function (req, res, next) {
    res.render('artists/artists-search');

});

router.get("/search", (req, res, next) => {
    const searchString = req.query.search;
    spotifyApi.searchArtists(searchString)
    .then(function (data) {
        res.render("artists/artists-results", data.body)
        console.log(data.body)
    }, function (err) {
        console.error(err);
    });

    
});


module.exports = router;
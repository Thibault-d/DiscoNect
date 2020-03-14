var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

// Spotify connection
var spotifyApi = new SpotifyWebApi({
    clientId: "cd0b194fb2b24c428ab881d81c27cf89",
    clientSecret: "7057c30773294124a2ca86de32c75aeb",
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
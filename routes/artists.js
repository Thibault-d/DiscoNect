var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

// Spotify connection
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

// Spotify - Retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

//Artists route, Search bar + display top 10 artists
router.get('/', function (req, res, next) {
    spotifyApi.getPlaylist('37i9dQZF1DXbHcQpOiXk1D')
        .then(function (data) {
            res.render('artists/artists-search', {
                artists: data.body.tracks.items
            });
            console.log(data.body.tracks.items[1].track.artists[0].name);
        }, function (err) {
            console.log('Something went wrong!', err);
        });
});

//Artists Search result, select the artist you want
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
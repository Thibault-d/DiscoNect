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
                res.render("artists/artists-results", {
                    results: data.body.artists.items
                })
            },
            function (err) {
                console.error(err);
            });
});

router.get("/details/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    spotifyApi.getArtist(id)
        .then(function (data) {
            res.render("artists/artists-details", {
                details: data.body,
                genre: data.body.genres,
            })
            console.log('Artist information', data.body)
        }, function (err) {
            console.error(err);
        });


})



module.exports = router;
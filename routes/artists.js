var express             = require('express');
var router              = express.Router();
var SpotifyWebApi       = require('spotify-web-api-node');
const Event             = require("../models/Event")

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

router.use((req, res, next) => {
    const redirect = req.url;
    console.log(redirect)
    if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
        next(); 
    } else {
        res.redirect("/login");
    }
});

router.get('/', function (req, res, next) {
    Promise.all([
        spotifyApi.getArtist('73sIBHcqh3Z3NyqHKZ7FOL'),
        spotifyApi.getArtist('4frXpPxQQZwbCu3eTGnZEw'),
        spotifyApi.getArtist('4LLpKhyESsyAXpc4laK94U'),
        spotifyApi.getArtist('2rspptKP0lPBdlJJAJHqht'),
        spotifyApi.getArtist('1uiEZYehlNivdK3iQyAbye'),
        spotifyApi.getArtist('2YZyLoL8N0Wb9xBt1NhZWg')
    ])
    .then((data)=>{
        res.render('artists/artists-search',{
            artists: data,
        })
    }), function (err) {
        console.log('Something went wrong!', err);
    };
})

//Artists Search result, select the artist you want
router.get("/search", (req, res, next) => {
    const searchString = req.query.search;
    spotifyApi.searchArtists(searchString)
        .then(function (data) {
                let dirty = data.body.artists.items;
                let clean = [];
                for (i = 0; i < dirty.length; i++) {
                    if (dirty[i].images.length > 0) {
                        clean[i] = dirty[i];
                    }
                }
                console.log(data.body.artists.items[1].images);
                res.render("artists/artists-results", {
                    results: clean
                })
            },
            function (err) {
                console.error(err);
            });
});

router.get("/details/:id", (req, res) => {
    const {id} = req.params;
    Promise.all([
        spotifyApi.getArtist(id),
        spotifyApi.getArtistTopTracks(id, 'GB'),
        Event.find({
            id_artists: { $all: [id] } 
       })
    ]).then((data) =>{
        const select = data[1].body.tracks.slice(0,3);
        res.render("artists/artists-details", {
            genre: data[0].body.genres,
            details: data[0].body,
            tracks: select,
            event:data[2]
        });    
    })
    .catch(error => { return error })
})

module.exports = router;
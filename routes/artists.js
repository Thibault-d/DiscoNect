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
        console.log(data)
        res.render('artists/artists-search',{
            artists: data,
            style: 'artists/search.css'
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
            console.log(data.body.artists.items[0].images[0].url);
                res.render("artists/artists-results", {
                    results: data.body.artists.items
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
        spotifyApi.getArtistTopTracks(id, 'GB')
    ]).then((data) =>{
        console.log(data[0].body.images[1].url)
        res.render("artists/artists-details", {
            genre: data[0].body.genres,
            details: data[0].body,
            tracks: data[1].body.tracks
        });    
    }).catch(error => { return error })
})

module.exports = router;
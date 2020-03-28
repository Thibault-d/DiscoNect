var express   = require('express');
var router    = express.Router();
const Artist = require('../models/Artist');

// VIEW THE FORM FOR CREATE A VENUE IF YOU ARE A PARTNER
router.get('/create-venue', function (req, res, next) {
  res.render('partner/create-venue', {
    style: 'venues/venues.css'
  });
});

// VIEW THE FORM FOR CREATE A EVENT IF YOU ARE A PARTNER
router.get('/create-event', function (req, res, next) {
    Artist.find()
    .then(artists => {
      res.render('partner/create-event', {
        style: 'venues/venues.css', artists
      });
    })
    .catch(error => {
      next(error);
    })
  });

module.exports = router;
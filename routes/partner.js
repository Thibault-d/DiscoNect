var express   = require('express');
var router    = express.Router();
const Venue   = require('../models/Venue');
const Event   = require('../models/Event');

// VIEW THE FORM FOR CREATE A VENUE IF YOU ARE A PARTNER
router.get('/create-venue', function (req, res, next) {
  res.render('partner/create-venue', {
    style: 'venues/venues.css'
  });
});

// VIEW THE FORM FOR CREATE A EVENT IF YOU ARE A PARTNER
router.get('/create-event', function (req, res, next) {
    res.render('partner/create-event', {
      style: 'venues/venues.css'
    });
  });

module.exports = router;
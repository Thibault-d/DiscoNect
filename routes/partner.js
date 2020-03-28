var express   = require('express');
var router    = express.Router();
const Artist = require('../models/Artist');

// VIEW THE FORM FOR CREATE A VENUE IF YOU ARE A PARTNER
router.get('/create-venue', function (req, res, next) {
  res.render('partner/create-venue');
});

// VIEW THE FORM FOR CREATE A EVENT IF YOU ARE A PARTNER
router.get('/create-event/:id', function (req, res, next) {
  const { id } = req.params;
  console.log(id + '-------------------------')  
  Artist.find()
    .then(artists => {
      console.log(artists);
      res.render('partner/create-event', {
        style: 'venues/venues.css', artists, id
      });
    })
    .catch(error => {
      next(error);
    })

  });

module.exports = router;
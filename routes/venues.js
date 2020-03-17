var express   = require('express');
var router    = express.Router();
const Venue   = require('../models/Venue');

/*
Obtener todos los datos para el mapa
Luego el mapa debera de recojer todos los objetos venues.latitude/venues.altitude

router.get('/', function (req, res, next) {
   Venue.find()
   .then(venues => {
      console.log(venues);
     res.render('venues/venues-browse', { venues });
   })
   .catch(() => {});
});
*/

// FAKE DATE 
router.get('/', function (req, res, next) {
   Venue.findById('5e6fe2d806392753e646cb87')
   .then(venue => {
      console.log(venue);
     res.render('venues/venues-browse', { venue });
   })
   .catch(() => {});
});

module.exports = router;
var express   = require('express');
var router    = express.Router();
const Venue   = require('../models/Venue');
const Event   = require('../models/Event');

/*
Obtener todos los datos para el mapa
Luego el mapa debera de recojer todos los objetos venues.latitude/venues.altitude

router.get('/', function (req, res, next) {
   Venue.find()
   .then(venues => {
      console.log(venues);
     res.render('venues/venues-browse', { venues });
   })
   .catch(error => {
         next(error);
       })
});
*/

// FAKE DATE 
router.get('/', function (req, res, next) {
   Venue.findById('5e6fe2d806392753e646cb87')
   .then(venue => {
     res.render('venues/venues-browse', { venue });
   })
   .catch(error => {
      next(error);
    })
});

router.get('/events/:id', function (req, res, next) {
    const { id } = req.params;
    Event.find({ id_venue: id})
      .then(events => {
        res.render('venues/venue-events', { events });
      })
      .catch(error => {
        next(error);
      })
});

router.get('/tickets/:id', function (req, res, next) {
    const { id } = req.params;
    Event.findById(id)
      .then(event => {
        console.log(event);
        res.render('venues/venue-tickets', { event });
      })
      .catch(error => {
        next(error);
      })
});

module.exports = router;
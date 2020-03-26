var express   = require('express');
var router    = express.Router();
const Venue   = require('../models/Venue');
const Event   = require('../models/Event');


router.use((req, res, next) => {
  const redirect = req.url;
  console.log(redirect)
  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
      next(); 
  } else {
      res.redirect("/login");
  }
});

// ONLY GET THE VIEW VENUES 
router.get('/', function (req, res, next) {
  res.render('venues/venues-browse');
});


// POST A VENUE IN BD
router.post('/', function (req, res, next) {
  Venue.create(req.body)
  .then(x => {
    res.render('venues/venues-browse');
  })
  .catch(error => {
    next(error);
  })
  /*
  .catch(error => {
      if(error.code === 11000) {
        return res.status(400).json({ error: 'This venue already exists' });
      } else {
        res.status(500).json({ error: 'Server error' });
      }
   })
  */
});




/*
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


// CUANDO UN PARTNER CREE UNA VENUE (SERA ESTA FUNCION) !!!!!
router.post('/', function (req, res, next) {

  // recojer los valores 
  // Y HACE EL POST

  Venue.find()
  .then(venue => {
    res.render('venues/venues-browse', { venue });
  })
  .catch(error => {
      if(error.code === 11000) {
        return res.status(400).json({ error: 'This venue already exists' });
      } else {
        res.status(500).json({ error: 'Server error' });
      }
   })
});
*/

router.get('/api', function (req, res, next){
  Venue.find()
  .then(venues => {
    res.json(venues)
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
        res.render('venues/venue-tickets', { event });
      })
      .catch(error => {
        next(error);
      })
});


module.exports = router;
var express   = require('express');
var router    = express.Router();
const Venue   = require('../models/Venue');
const Event   = require('../models/Event');

// TEST IF YOU ARE A PARTNER OR A CLIENT
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
  // NECESITO RECOJER EL ID DEL PARTNER REGISTRADO PARA PODER HACER UN ADD SIN PEDIRLO
  res.render('venues/venues-browse');
});


// POST A VENUE IN BD
router.post('/', function (req, res, next) {
  Venue.create(req.body)
  .then(x => {
    res.render('venues/venues-browse');
  })
  .catch(error => {
      if(error.code === 11000) {
        return res.status(400).json({ error: 'This venue already exists' });
      } else {
        res.status(500).json({ error: 'Server error' });
      }
   })
});

// GET THE VIEW OF THE EVENTS (ONE PARTNER)
router.get('/events/:id', function (req, res, next) {
  const { id } = req.params;
  Event.find({ id_venue: id})
    .then(events => {
      console.log('------------------id-----------------' + id)
      res.render('venues/venue-events', { events, style: 'venues/venues.css', id });
    })
    .catch(error => {
      next(error);
    })
});

// POST A EVENT IN BD
router.post('/event', function (req, res, next) {
  console.log(req.body)
  Event.create(req.body)
  .then(x => {
    res.render('venues/venues-browse');
  })
  .catch(error => {
    next(error);
  })
});

router.get('/api', function (req, res, next){
  Venue.find()
  .then(venues => {
    res.json(venues)
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




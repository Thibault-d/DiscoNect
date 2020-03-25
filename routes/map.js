var express   = require('express');
var router    = express.Router();
const Venue   = require('../models/Venue');
const Event   = require('../models/Event');


// GET ALL THE VENUES (THE PARTNER IS NOT REGISTER)
  router.get('/apiAll', function (req, res, next){
    Venue.find()
    .then(venues => {
      res.json(venues)
    })
    .catch(error => {
      next(error);
    })
  });

// GET ONLY THE VENUES THAT THE PARTNER HAS
  router.get('/api/:id', function (req, res, next){
    const { id } = req.params;
    Venue.findOne({"id_partner": id})
    .then(venues => {
      res.json(venues)
    })
    .catch(error => {
      next(error);
    })
  });

module.exports = router;
const Venue = require('../models/Venue');

// ADD A VENUE 
exports.addVenue = (req, res, next) => {
  Venue.create(req.body)
  .then(venue => {
    res.render('venues/venues-browse');
  })
  .catch(error => {
    next(error);
  })
};
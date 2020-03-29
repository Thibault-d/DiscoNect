const Venue = require('../models/Venue');

// GET ALL THE VENUES FOR THE MAP
/*
exports.getVenues = async (req, res, next) => {
  try {
    const venues = await Venue.find();
    return res.status(200).json({
      success: true,
      count: venues.length,
      data: venues
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};*/

     //  ME DEVUELVE EN FORMADO UNDECODE ....



/*
  // GET THE VENUES FROM PARTNER 
  exports.getVenues = (req, res, next) => {
    Venue.findById(req.params.id)
    .then(venues => {
      return venues;
    })
    .catch(error => {
      next(error);
    })
  };
*/

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
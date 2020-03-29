var express         = require('express');
var router          = express.Router();
const session       = require("express-session");
const MongoStore    = require("connect-mongo")(session);
const Venue         = require('../models/Venue');
const Partner       = require("../models/Partner")
const User          = require("../models/User")

router.get('/identify', function (req, res, next) {
  username = req.session.currentUser.username;
  Promise.all([
      Partner.findOne({
        "username": username
      }),
      User.findOne({
        "username": username
      })
    ])
    .then(values => {
      if (values[0] !== null) {
        console.log("You are a Partner!")
        console.log("Your Partner ID is:",req.session.currentUser._id )
        Venue.find({
            'id_partner': req.session.currentUser._id
          })
          .then(venues => {
            res.json(venues);
          })
          .catch(error => {
            next(error);
          })
      } else if (values[1] !== null) {
        console.log("you're a simple user")
        Venue.find()
        .then(venues => {
          res.json(venues);
        })
        .catch(error => {
          next(error);
        })
      } else {
        console.log("you're not logged in!")
      }
    });
});

module.exports = router;

/*
// GET ALL THE VENUES (THE PARTNER IS NOT REGISTER)
  router.get('/apiAll', function (req, res, next){
    console.log("user", req.session.currentUser);
    Venue.find()
    .then(venues => {
      res.json(venues);

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
*/
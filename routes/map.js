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
        Venue.find()
        .then(venues => {
          res.json(venues);
        })
        .catch(error => {
          next(error);
        })
      }
    });
});

module.exports = router;
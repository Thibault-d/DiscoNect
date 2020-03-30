const express       = require('express');
const router        = express.Router();
const Partner       = require("../models/Partner")
const User       = require("../models/User")
const bcrypt        = require("bcrypt");
const bcryptSalt    = 10;

//Get the signup form
router.get('/', function (req, res, next) {
  res.render('login/signup');
});

//Post the signup form
router.post('/', function (req, res, next) {
  const usertype = req.body.type; //defines if Visitor or Partner is selected
  const name = req.body.name;
  const surnames = req.body.surname;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

Promise.all([
    User.findOne({
      "email": email
    }),
    Partner.findOne({
      "email": email
    }),
    User.findOne({
      "username": username
    }),
    Partner.findOne({
      "username": username
    })
  ])
  .then(values => {
    if (values[0] !== null || values[1] !== null) {
      res.render("login/signup", {
        errorMessage: "The Email already exists in the database"
      })
    } else if (values[2] !== null || values[3] !== null) {
      res.render("login/signup", {
        errorMessage: "The Username already exists in the database"
      }) //If username and email don't exist : create a new entry in the DB
    } else {
      switch (usertype) {
        case "Visitor":
          req.session.currentUser = User.create({
              name,
              surnames,
              username,
              email,
              password: hashPass
            }) //Redirection route after you succesfully registered
            .then((x) => {
              req.session.currentUser =x;
              res.cookie('type', 'visitor', { maxAge: 90000000});
              res.redirect("/");
            })
            .catch(error => {
              console.log(error);
            })
          break;
        case "Partner":
         Partner.create({
              name,
              surnames,
              username,
              email,
              password: hashPass
            }) //Redirection route after you succesfully registered
            .then((x) => {
              req.session.currentUser =x;
              res.cookie('type', 'partner', { maxAge: 900000});
              res.redirect("/");
            })
            .catch(error => {
              console.log(error);
            })
          break;
      }
    }
  })
})


module.exports = router;

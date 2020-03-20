const express       = require('express');
const router        = express.Router();
const Partner       = require("../models/Partner")
const bcrypt        = require("bcrypt");
const bcryptSalt    = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/signup');
});

router.post('/', function (req, res, next) {
  const name = req.body.name;
  const surnames = req.body.surname;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  Promise.all([
    Partner.findOne({
      "email": email
    }), 
    Partner.findOne({
      "username": username
    }), 
  ])
    .then(function(values) {
    console.log(values);
    if(values[0] !== null){
      res.render("login/signup", {
        errorMessage: "The Email already exists in the database"
    })} else if(values[1] !== null){
      res.render("login/signup", {
        errorMessage: "The Username already exists in the database"
    })} else {
      Partner.create({
        name,
        surnames,
        username,
        email,
        password: hashPass
      })
      .then(() => {
        res.redirect("/");
      })
      .catch(error => {
        console.log(error);
      })
  }
  });
  })

module.exports = router;

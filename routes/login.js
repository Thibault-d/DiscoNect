const express    = require('express');
const router     = express.Router();
const Partner    = require("../models/Partner")



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/login');
});

router.post('/login', function(req, res, next) {
    Partner.findOne({ "name": name })
    .then(partner => {
      if (partner !== null) {
          res.render("login/login", {
            errorMessage: "The username already exists!"
          });
          return;
        }      
  })});



module.exports = router;
const express    = require('express');
const router     = express.Router();
const bcrypt     = require("bcrypt");
const saltRounds = 2;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/signup');
});

router.post('/', function (req, res, next){
  console.log(req.params)
  res.render('/login/signup');

})

module.exports = router;

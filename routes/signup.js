const express    = require('express');
const router     = express.Router();
const bcrypt     = require("bcrypt");
const saltRounds = 2;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/register');
});

module.exports = router;

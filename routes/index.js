var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/artists', function(req, res, next) {
  res.render('artists/artists-search');
 
});


module.exports = router;

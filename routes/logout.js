var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
    req.session.destroy((err) => {
      console.log('Session destroyed')
      res.redirect("/");
    });
  });

module.exports = router;

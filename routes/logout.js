var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
  
    req.session.destroy((err) => {
      console.log('Session destroyed')
      res.redirect("/");
    });
    res.clearCookie('type', { path: '/' });
    res.clearCookie('logged', { path: '/' });
  });

module.exports = router;

var express = require('express');
var router = express.Router();
const Partner = require("../models/Partner")
const User = require("../models/User")

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render("login/myaccount", {
        currentuser: req.session.currentUser
    })
})

module.exports = router;
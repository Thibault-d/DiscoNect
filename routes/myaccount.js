var express = require('express');
var router = express.Router();
const Partner       = require("../models/Partner")

/* GET users listing. */
router.get('/', function(req, res, next) {
    Partner.findOne({"username" : req.session.currentUser.username})
    .then(partner => {
        console.log(req.session.currentUser.name)
        res.render("login/myaccount", {
            currentuser: req.session.currentUser
        })
    })
});

module.exports = router;

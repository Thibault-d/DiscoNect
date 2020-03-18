const express = require('express');
const router = express.Router();
const Partner = require("../models/Partner")

/* GET home page. */
router.get('/', function (req, res, next) {
    Partner.find()
        .then(partner => {
            console.log(partner);
            res.render('login/login');
        })
});


router.post('/', function (req, res) {
    const name = req.body.name;
    const password = req.body.password;
    Partner.findOne({"name": name})
        .then(partner => {
            if (partner !==null) {
            console.log("user exists in the DB");}
        })
        .catch(error => {
            next(error);
          })
})


module.exports = router;
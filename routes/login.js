const express       = require('express');
const router        = express.Router();
const Partner       = require("../models/Partner")
const User          = require("../models/User")
const session       = require("express-session");
const MongoStore    = require("connect-mongo")(session);
const bcrypt        = require("bcrypt");
const saltRounds    = 10;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login/login',
    {
        style: 'login/login.css'
    });
});

router.post('/', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    Promise.all([
            Partner.findOne({
                "username": username
            }),
            User.findOne({
                "username": username
            })
        ])
        .then(values => {
            console.log(values)
            if (values[0] !== null) {
                if (bcrypt.compareSync(password, values[0].password)) {
                    // Save the login in the session!
                    req.session.currentUser = values[0];
                    res.redirect("/");
                } else {
                    res.render("login/login", {
                        errorMessage: "Incorrect password"
                    });
                }
            } else if (values[1] !== null) {
                if (bcrypt.compareSync(password, values[1].password)) {
                    // Save the login in the session!
                    req.session.currentUser = values[1];
                    res.redirect("/");
                } else {
                    res.render("login/login", {
                        errorMessage: "Incorrect password"
                    });
                } 
            } else {
                res.render("login/login", {
                    errorMessage: "You username wasn't found in our Systems"
                })
            }  
        })
})
module.exports = router;
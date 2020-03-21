const express       = require('express');
const router        = express.Router();
const Partner       = require("../models/Partner")
const session       = require("express-session");
const MongoStore    = require("connect-mongo")(session);
const bcrypt        = require("bcrypt");
const saltRounds    = 10;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login/login');
});

router.post('/', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    Partner.findOne({"username": username})
        .then(user => {
            if (user == null) {
                res.render("login/login", {
                    errorMessage: "The username doesn't exist."
                });
                return;
            }
            if (bcrypt.compareSync(password, user.password)) {
                // Save the login in the session!
                req.session.currentUser = user;
                res.redirect("/");
            } else {
                res.render("login/login", {
                    errorMessage: "Incorrect password"
                });
            }
        })
        .catch(error => {
            next(error);
        })
});


module.exports = router;
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

    if (name === "" || password === "") {
        res.render("login/login", {
            errorMessage: "Please enter both, username and password to sign up."
        });
        return;
    }

    Partner.findOne({
            "name": name
        })
        .then(user => {
            if (user == null) {
                res.render("login/login", {
                    errorMessage: "The username doesn't exist."
                });
                return;
            }
            if (bcrypt.compareSync(thePassword, user.password)) {
                // Save the login in the session!
                req.session.currentUser = user;
                res.redirect("/");
            } else {
                res.render("auth/login", {
                    errorMessage: "Incorrect password"
                });
            }
        })
        .catch(error => {
            next(error);
        })
});


module.exports = router;
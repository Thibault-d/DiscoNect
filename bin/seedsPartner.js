const Partner       = require('../models/Partner');
const mongoose      = require('mongoose');
const monogUrl      = 'mongodb+srv://alejandro:1234@cluster0-onpcf.mongodb.net/disconnect-proyect?retryWrites=true&w=majority';
const monogUrlTest  = 'mongodb+srv://alejandro:1234@cluster0-onpcf.mongodb.net/test?retryWrites=true&w=majority';
const mongoLocal    = 'mongodb://localhost/disconnect';

let partners = [
    {
        name: "disconnect",
        surnames: "test 01",
        username: "ale",
        email: "disconnect01@gmail.com",
        password: "1234"
    }
];

mongoose
  .connect(monogUrl, {useNewUrlParser: true})
  .then(x => {
    Partner.create(partners, err)

  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
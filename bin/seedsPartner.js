const Partner       = require('../models/Partner');
const mongoose      = require('mongoose');
const monogUrl      = 'mongodb+srv://alejandro:1234@cluster0-onpcf.mongodb.net/test?retryWrites=true&w=majority';
const mongoLocal    = 'mongodb://localhost/disconnect';

let partners = [
    {
        name: "disconnect",
        surnames: "test 01",
        email: "disconnect01@gmail.com",
        password: "1234"
    }
];

mongoose
  .connect(monogUrl, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    console.log(partners);

    Partner.create(partners, err => {
        if(err)
            console.log("Error with the creations parnters")
        else
            mongoose.connection.close();
    })

  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
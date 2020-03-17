const Users         = require('../models/User');
const mongoose      = require('mongoose');
const mongoUrl      = 'mongodb+srv://alejandro:1234@cluster0-onpcf.mongodb.net/disconnect-proyect?retryWrites=true&w=majority';
const mongoUrlTest  = 'mongodb+srv://alejandro:1234@cluster0-onpcf.mongodb.net/test?retryWrites=true&w=majority';
const mongoLocal    = 'mongodb://localhost/disconnect';

let users = [
    {
        name: "thibault",
        surnames: "delfaud",
        email: "thibault@gmail.com",
        password: "1234"
    }
];

mongoose
  .connect(mongoUrlTest, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)

    Users.create(users, err => {
        if(err)
            console.log("Error with the creations parnters")
        else
            mongoose.connection.close();
    })

  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
const Event         = require('../models/Event');
const mongoose      = require('mongoose');
const monogUrl      = 'mongodb+srv://alejandro:1234@cluster0-onpcf.mongodb.net/test?retryWrites=true&w=majority';
const mongoLocal    = 'mongodb://localhost/disconnect';

let events = [
    {
        name: 'Techno1',
        place: 'Sala2',
        picture: 'https://lh5.googleusercontent.com/p/AF1QipOWv4QtCvt5gJ-fvux_sR9fObSKhF3mIVvWLX2R=w408-h272-k-no',
        description: 'Good Disco Good Disco Good Disco Good Disco Good Disco Good Disco Good Disco Good Disco',
        date: '1552261496289',
        id_venue: '5e6fe2d806392753e646cb87',
        id_artist: []
    }
];

mongoose
  .connect(monogUrl, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    Event.create(events, err => {
        if(err)
            console.log("Error with the creations Event")
        else
            mongoose.connection.close();
    })
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
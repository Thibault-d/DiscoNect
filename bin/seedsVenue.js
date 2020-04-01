const Venue         = require('../models/Venue');
const mongoose      = require('mongoose');
const monogUrl      = 'mongodb+srv://alejandro:1234@cluster0-onpcf.mongodb.net/test?retryWrites=true&w=majority';
const mongoLocal    = 'mongodb://localhost/disconnect';

let venues = [
    {
        name: 'Razz',
        place: 'Carrer dels Almogàvers, 122, 08018 Barcelona',
        altitude: 0,
        latitude: 0,
        picture: 'https://lh5.googleusercontent.com/p/AF1QipOWv4QtCvt5gJ-fvux_sR9fObSKhF3mIVvWLX2R=w408-h272-k-no',
        description: 'Good Disco Good Disco Good Disco Good Disco Good Disco Good Disco Good Disco Good Disco',
        id_partner: '5e6fd3666a03e746fdaa219b' 
    }
];

mongoose
  .connect(monogUrl, {useNewUrlParser: true})
  .then(x => {
    Venue.create(venues, err)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
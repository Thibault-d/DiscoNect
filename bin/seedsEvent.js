const Event         = require('../models/Event');
const mongoose      = require('mongoose');
const monogUrl      = 'mongodb+srv://alejandro:1234@cluster0-onpcf.mongodb.net/test?retryWrites=true&w=majority';
const mongoLocal    = 'mongodb://localhost/disconnect';

let events = [
    {
        name: 'Concierto',
        place: 'Sala 2',
        description: 'Childish Gambino in concert, he just released his new album',
        date: '1552261496289',
        id_venue: '5e6fe2d806392753e646cb87',
        id_artists: ["73sIBHcqh3Z3NyqHKZ7FOL"]
    },
    {
      name: 'Festival',
      place: 'Open air',
      description: 'Childish Gambino, Thundercat and Mac Miller are joining forces for this unique event. Get your groove on!',
      date: '1552261496289',
      id_venue: '1b6fe2d206392743e646ab65',
      id_artists: ["73sIBHcqh3Z3NyqHKZ7FOL", "4frXpPxQQZwbCu3eTGnZEw","4LLpKhyESsyAXpc4laK94U" ]
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
const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
    name:        {type: String, required: true},
    place:       {type: String, required: true},
    description: {type: String, required: true},
    date:        {type: Date, required: true},
    id_venue:    {type: String },
    id_artists:  {type: Array}
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
const mongoose = require('mongoose');

const { Schema } = mongoose;

const venueSchema = new Schema({
    name:           {type: String, required: true},
    place:          {type: String, required: true},
    altitud:        {type: Number},
    latitud:        {type: Number},
    picture:        {type: String, required: true},
    description:    {type: String, required: true},
    id_partener:    {type: Number, required: true, unique: true}
});

const Venue = mongoose.model('Venue', venueSchema);
module.exports = Venue;
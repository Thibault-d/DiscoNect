const mongoose = require('mongoose');

const { Schema } = mongoose;

const artistSchema = new Schema({
    name:        {type: String, required: true},
    image:       {type: String, required: true},
    spotifyid:   {type: String, required: true},
});

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;
const mongoose = require('mongoose');

const { Schema } = mongoose;

const partnerSchema = new Schema({
    name:       {type: String, required: true},
    surnames:   {type: String, required: true},
    username:   {type: String, required: true},
    email:      {type: String, required: true, unique: true},
    password:   {type: String, required: true},
});

const Partner = mongoose.model('Partner', partnerSchema);
module.exports = Partner;
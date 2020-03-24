const mongoose = require('mongoose');
var geo = require('mapbox-geocoding');

const { Schema } = mongoose;

const venueSchema = new Schema({
    name:           {type: String, required: [true, "Please add a venue's name"], unique: true},
    address:        {type: String, required: [true, 'Please add an address']},
    picture:        {type: String, required: true},
    location: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
      },
    description:    {type: String, required: true},
    id_partner:     {type: String, required: true}
});


// Geocode & create location
venueSchema.pre('save', function (next) {
     geo.setAccessToken(process.env.MAPBOX_TOKEN);
     geo.geocode('mapbox.places', this.address, (err, geoData) => {
       if (err) {
         console.log(err);
         return ;
       }
       this.location = {
         type: 'Point',
         coordinates: geoData.features[0].center,
         formattedAddress: geoData.features[0].place_name
       }
      next();
     });
   });

module.exports = mongoose.model('Venue', venueSchema);
   
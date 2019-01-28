const mongoose = require('mongoose');

const outfitSchema = mongoose.Schema({
    name: String,
    top: String,
    bottom: String,
    shoe: String,
    accessory: String
});

const Outfit = mongoose.model('Outfit', outfitSchema);

module.exports = Outfit;
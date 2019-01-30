const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    brand: String,
    type: String,
    color: String,
    image: String,
    userId: { type: mongoose.Schema.ObjectId, ref: "User"}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
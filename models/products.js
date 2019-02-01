const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    brand: String,
    type: String,
    color: String,
    image: String,
    description: String,
    userId: { type: mongoose.Schema.ObjectId, ref: "User"},
    comments: [  {userId: String, username: String, comment: String}  ]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;




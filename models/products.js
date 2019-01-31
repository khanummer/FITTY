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




// const productSchema = mongoose.Schema({
//     comments: [ { {userId: String}, {comment: String} } ],
//     likedBy: [ {userId: String} ],
//     dislikedBy: [ {userId: String} ]
// })

// const userSchema = mongoose.Schema({
//     followers: [ {userId: String} ],
//     following: [ {userId: String} ],
//     likes: [ {productId: String} ],
//     dislikes: [ {productId: String} ]

// })



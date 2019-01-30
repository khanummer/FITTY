const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    products: [ { type: mongoose.Schema.ObjectId, ref: "Product"} ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
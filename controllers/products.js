const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const User = require('../models/users');
// index route
router.get('/', async (req, res) => {
    try {
        const allProducts = await Product.find({});
        res.render('products/index.ejs', {
            product: allProducts,
            currentUser: req.session.user

        })
    } catch (err) {
        res.send(err);
        console.log(err);
    }   
});


// new route
router.get('/new', async (req, res) => {
    try {
        const allUsers = await User.find({})
            res.render('products/new.ejs', {
                users: allUsers,
                currentUser: req.session.user


            })
        
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

// create route
router.post('/', async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user._id);
        const createProduct = await Product.create(req.body);
        createProduct.userId = foundUser._id
        createProduct.save()
        foundUser.products.push(createProduct._id);
        foundUser.save()
        res.redirect('/products');
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

// show route
router.get('/:id', async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.id).populate("userId");
        res.render('products/show.ejs', {
            product: foundProduct,
            currentUser: req.session.user


        })
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

// comment route
router.post('/:id', async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.id);
        const foundUser = await User.findById(req.session.user._id);
        const newComment = {}
        newComment.userId = foundUser._id;
        newComment.username = foundUser.username;
        newComment.comment = req.body.newcomment;
        foundProduct.comments.push(newComment)
        foundProduct.save();
        // console.log(foundProduct);
        // console.log(foundUser)
        res.redirect(`/products/${foundProduct._id}`);        
    } catch (err) {
        res.send(err);
        console.log(err);
    }
})

// edit get route
router.get('/:id/edit', async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.id);
        res.render('products/edit.ejs', {
            product: foundProduct,
            currentUser: req.session.user


        })
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

// edit post route
router.put('/:id', async (req, res) => {
    try {
        const createdProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.redirect('/products');
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

// delete route
router.delete('/:id', async (req, res) => {
   const deletedProduct = await Product.findByIdAndRemove(req.params.id);
   res.redirect('/products');
})












module.exports = router;
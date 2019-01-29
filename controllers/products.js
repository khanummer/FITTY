const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const User = require('../models/users');
// index route
router.get('/', async (req, res) => {
    try {
        const allProducts = await Product.find({});
        res.render('products/index.ejs', {
            product: allProducts
        })
    } catch (err) {
        res.send(err);
        console.log(err);
    }   
});


// new route
router.get('/new', async (req, res) => {
    try {
        res.render('products/new.ejs')
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

// create route
router.post('/', async (req, res) => {
    try {
        const findUser = User.findById(req.body.userId);
        const createProduct = await Product.create(req.body);

        const [foundProduct, createdUser] = await Promise.all([findProduct, createProduct]);
        foundProduct.users.push(createdUser)
        res.redirect('/products');
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

// show route
router.get('/:id', async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.id);
        res.render('products/show.ejs', {
            product: foundProduct
        })
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

// edit get route
router.get('/:id/edit', async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.id);
        res.render('products/edit.ejs', {
            product: foundProduct
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
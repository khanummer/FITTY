const express = require('express');
const router = express.Router();
const Outfit = require('../models/outfits');

// index route
router.get('/', async (req, res) => {
    try {
        const allOutfits = await Outfit.find({});
        res.render('outfits/index.ejs', {
            outfit: allOutfits
        })
    } catch (err) {
        res.send(err);
        console.log(err);
    }   
});


// new route
router.get('/new', async (req, res) => {
    try {
        res.render('outfits/new.ejs')
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

// create route
router.post('/', async (req, res) => {
    try {
        const createdOutfit = await Outfit.create(req.body);
        res.redirect('/outfits');
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});


module.exports = router;
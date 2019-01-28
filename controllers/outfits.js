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

// show route
router.get('/:id', async (req, res) => {
    try {
        const foundOutfit = await Outfit.findById(req.params.id);
        res.render('outfits/show.ejs', {
            outfit: foundOutfit
        })
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

// edit get route
router.get('/:id/edit', async (req, res) => {
    try {
        const foundOutfit = await Outfit.findById(req.params.id);
        res.render('outfits/edit.ejs', {
            outfit: foundOutfit
        })
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

// edit post route
router.put('/:id', async (req, res) => {
    try {
        const createdOutfit = await Outfit.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.redirect('/outfits');
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

// delete route
router.delete('/:id', async (req, res) => {
   const deletedOutfit = await Outfit.findByIdAndRemove(req.params.id);
   res.redirect('/outfits');
})












module.exports = router;
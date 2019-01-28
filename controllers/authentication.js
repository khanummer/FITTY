const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');


router.get('/', (req, res) => {
res.send(': (');
});







router.post('/registration', async (req, res) => {
    // username
    const username = req.body.username;
    // password
    const password = req.body.password;
    // have 2 hash / encrypt the password
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // enter into database
    const newUser = {};
    newUser.username = username;
    newUser.password = hashedPassword;
    // newUser.accountType = req.body.accountType === 'Buyer' ? 'Buyer' : 'Seller
    try {
        const createdUser = await User.create(newUser);
        // create a session
        req.session.username = createdUser.username;
        req.session.logged = true;
        req.session.accountType = createdUser.accountType;
        res.redirect('/')
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

router.post('/login', async (req,res) => {
    try {
        // find the logged in user , getting username from req.body
        const loggedUser = await  User.findOne({username: req.body.username});
        // check if passwords match and if do redirect to page if not keeep on splash page w message
        if (loggedUser) {
            if(bcrypt.compareSync(req.body.password, loggedUser.password)) {
                req.session.message = '';
                req.session.currentUser = loggedUser._id;
                req.session.username = loggedUser.username;
                req.session.logged = true;
                res.redirect('/')
                console.log(loggedUser);
            } else {
                req.session.message = 'your username or password are incorrect'
            }
            
        } else {
            req.session.message = "your username or password are incorrect";
            res.redirect('/')
        }
    } catch (err) {
        res.send(err);
        console.log(err);
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){ 
            res.send(err);
        } else {
            res.redirect('/');
        }
    })
})

module.exports = router;
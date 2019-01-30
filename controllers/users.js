const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Product = require('../models/products');
const bcrypt = require('bcryptjs');


// ajax search route

router.get('/get-users', async (req, res) => {
    console.log("hit")
    try {
   const foundUsers = await User.find({});
   console.log('this is the users', foundUsers);
   res.json(foundUsers);
    } catch (err) {
        res.send(err);
        console.log(err);
    }
})


// index route
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.render('users/index.ejs', {
            users: allUsers
        })
    } catch (err) {
        res.send(err);
        console.log(err)
    }
});

// search route
router.post('/search', async (req, res) => {
    try {
        const allUsers = await User.find({username:  req.body.searchbarinput});
        res.render('users/index.ejs', {
            users: allUsers
        })
    } catch (err) {
        res.send(err);
        console.log(err)
    }
});

// new route
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
}) 

// create route
router.post('/', async (req, res) => {
    User.create(req.body, (err, createdUser) => {
        if (err) {
            res.send(err);
            console.log(err);
        } else {
            res.redirect('/users');
        }    
    })
})

// show route

router.get('/:id', async (req, res) => {
    try {
    const foundUser = await User.findById(req.params.id).populate("products");
    res.render('users/show.ejs', {
        user: foundUser
    })
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

// edit route
router.get('/:id/edit', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);
        res.render('users/edit.ejs', {
            user: foundUser
        })
    } catch(err) {
        res.send(err);
        console.log(err);
    }
})

// update route
router.put('/:id', async (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedUser) => {
        if (err) {
          res.send(err);
        } else {
          res.redirect('/users');
        }
      });
    });

    // try {
    //     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
    //     res.redirect('/users');
    // } catch (err) {
    //     console.log(err);
    //     res.render(err);
    // }
// })

// delete route
router.delete(':/id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, deletedAuthor) => {
    const productIds = [];
    for ( let i = 0; i < deletedUser.products[i]._id; i++){
        productIds.push(deletedUser.products[i]._id);       
    }
        Product.deleteMany(
            {
                _id: {
                    $in: productIds
                }
            }, 
            (err, data) => {
                res.redirect('/users');
            }
        )
    })
})





// registration / sign up route
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
        req.session.user = createdUser
        req.session.username = createdUser.username;
        req.session.logged = true;
        req.session.accountType = createdUser.accountType;
        res.redirect('/')
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});


// login route
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
                req.session.user = loggedUser;
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


// logout route
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
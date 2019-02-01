const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productController = require('./controllers/products');
const userController =require('./controllers/users');
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config();

require('./db/db');




app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: 'THIS IS A RANDOM SECRET STRING',
    resave: false,
    saveUninitialized: false
}))


app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

app.use( (req, res, next) => {
    res.locals.currentUser = req.session.user
    next()
})

app.use('/products', productController);
app.use('/users', userController);




app.get('/', (req, res) => {
    res.render('index.ejs', {
        message: req.session.message,
        loggedUser: req.session.username
    })
});








app.listen(process.env.PORT, () => {
    console.log('LISTENING ON PORT 3000')
});
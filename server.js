const express = require('express');
const app = express();
require('./db/db');
const bodyParser = require('body-parser');
const outfitController = require('./controllers/outfits');
const authenticationController =require('./controllers/authentication');
const methodOverride = require('method-override');
const session = require('express-session');

app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: 'THIS IS A RANDOM SECRET STRING',
    resave: false,
    saveUninitialized: false
}))


app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/outfits', outfitController);
app.use('/authentication', authenticationController);




app.get('/', (req, res) => {
    res.render('index.ejs', {
        message: req.session.message,
        loggedUser: req.session.username
    })
});









app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
});
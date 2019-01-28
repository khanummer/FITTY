const express = require('express');
const app = express();
require('./db/db');
const bodyParser = require('body-parser');
const outfitController = require('./controllers/outfits');
const methodOverride = require('method-override');


app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/outfits', outfitController);





app.get('/', (req, res) => {
    res.render('index.ejs')
});









app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
});
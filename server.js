//Global Variables
const express   = require('express');
const app       = express();
const port      = 3000;
const mongoose  = require('mongoose');

// Middleware
app.use(express.static('public'));
const roygbivController = require('./controllers/roygbiv.js');
app.use('/roygbiv', roygbivController);

//Restful Routes
app.get('/', (req, res) => {
	res.render('index.ejs');
});

//Listners
mongoose.connect('mongodb://localhost:27017/colorful');

mongoose.connection.once('open', () => {
	console.log('colorful app connected to mongo');
});

app.listen(port, () => {
	console.log('colorful app connected to app listener');
});

//Global Variables
const express   = require('express');
const app       = express();
const port      = 3000;

// Middleware
app.use(express.static('public'));

//Restful Routes
app.get('/', (req, res) => {
	res.render('index.ejs');
});










//Listners
app.listen(port, () => {
	console.log('colorful app connected to app listener');
});

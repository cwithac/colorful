//Global Variables
const express   		 = require('express');
const app       		 = express();
const port      		 = process.env.PORT || 3000;
const mongoose  		 = require('mongoose');
const bodyParser		 = require('body-parser');
const methodOverride = require('method-override')

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));

//Controller Middleware
const roygbivController = require('./controllers/roygbiv.js');
app.use('/roygbiv', roygbivController);

//Restful Routes
app.get('/', (req, res) => {
	res.render('index.ejs');
});

//Listners
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/colorful';
mongoose.connect(mongoUri);

mongoose.connection.once('open', () => {
	console.log('colorful app connected to mongo');
});

app.listen(port, () => {
	console.log('colorful app connected to ' + port);
});

//Global Variables
const express   		 = require('express');
const app       		 = express();
const PORT      		 = process.env.PORT || 3000;
const mongoose  		 = require('mongoose');
// const bodyParser		 = require('body-parser');
const methodOverride = require('method-override')

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

//Controller Middleware
const roygbivController = require('./controllers/roygbiv.js');
app.use('/roygbiv', roygbivController);

const wordsController = require('./controllers/words.js');
app.use('/words', wordsController);

//Restful Routes
app.get('/', (req, res) => {
	// res.render('index.ejs');
	res.redirect('/roygbiv');
});

//Listners
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/colorful';
mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));

app.listen(PORT, () => {
	console.log('colorful app connected to ' + PORT);
});

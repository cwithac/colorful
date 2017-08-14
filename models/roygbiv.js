//Global Variables
const mongoose = require('mongoose');
const Word = require('./words.js');

//Schema
const roygbivSchema = mongoose.Schema({
	name: String,
	hex: String,
	description: String,
	words: [Word.schema]
});

//Listeners
const Roygbiv = mongoose.model('Roygbiv', roygbivSchema);
module.exports = Roygbiv;

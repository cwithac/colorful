//Global Variables
const mongoose = require('mongoose');

//Schema
const wordSchema = mongoose.Schema({
	name: String,
	hex: String
});

//Listeners
const Word = mongoose.model('Word', wordSchema);
module.exports = Word;

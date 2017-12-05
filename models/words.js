//Global Variables
const mongoose = require('mongoose');

//Schema
const wordSchema = mongoose.Schema({
	name: { type: String, required: true },
	hex: { type: String, required: true },
	color: { type: mongoose.Schema.Types.ObjectId, ref: 'Roygbiv' }
});

//Listeners
const Word = mongoose.model('Word', wordSchema);
module.exports = Word;

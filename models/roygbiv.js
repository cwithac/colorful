//Global Variables
const mongoose = require('mongoose');
const Word = require('./words.js');

//Schema
const roygbivSchema = mongoose.Schema({
	name: { type: String, required: true },
	hex: { type: String, required: true },
	description: { type: String, required: true }
});

//Listeners
const Roygbiv = mongoose.model('Roygbiv', roygbivSchema);
module.exports = Roygbiv;

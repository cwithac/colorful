//Global Variables
const mongoose = require('mongoose');

//Schema
const roygbivSchema = mongoose.Schema({
	name: String
});

//Listeners
const Roygbiv = mongoose.model('Roygbiv', roygbivSchema);
module.exports = Roygbiv;

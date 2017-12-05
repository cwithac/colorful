//Global Variables
const express 	= require('express');
const colors 		= express.Router();
const Roygbiv 	= require('../models/roygbiv.js');
const Word 			= require('../models/words.js')

//Restful Routes
colors.get('/', async (req, res)=>{
	try {
		const foundColors = await Roygbiv.find().sort( { name: 1} ).populate('words');
		res.render('roygbiv/index.ejs', {foundColors});
	} catch (err) {
		res.send( err.message );
	};
});

colors.get('/:id', async (req, res) => {
	try {
		const foundAColor = await Roygbiv.findById(req.params.id);
		const foundAWord = await Word.find({'color': foundAColor.id}).sort({name: 1});
		res.render('roygbiv/read.ejs', {color: foundAColor, foundAWord });
	} catch (err) {
		res.send (err.message);
	};
});

//Seed Route
//@roygbiv/seed/roygbiv
// const colorSeeds = require ('../models/colorseed.js');
// 	colors.get ('/seed/roygbiv', async (req, res) => {
// 		try {
// 			const allTheColors = await Roygbiv.insertMany(colorSeeds);
// 			res.redirect('/roygbiv');
// 		} catch (err) {
// 			res.send(err.message);
// 		};
// 	});


//Listners
module.exports = colors;

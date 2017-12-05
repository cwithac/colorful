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

//POST DELETE AND UPDATE DISABLED FOR LIVE SITE
// colors.get('/create', (req, res)=>{
// 	res.render('roygbiv/create.ejs');
// });

colors.get('/:id', async (req, res) => {
	try {
		const foundAColor = await Roygbiv.findById(req.params.id);
		const foundAWord = await Word.findOne({'color': foundAColor.id})
		res.render('roygbiv/read.ejs', {color: foundAColor, word: foundAWord });
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

//POST AND DELETE DISABLED FOR LIVE SITE
// colors.post('/', async (req, res) => {
// 	try {
// 		const createdColor = await Roygbiv.create(req.body);
// 		res.redirect('/roygbiv');
// 	} catch (err) {
// 		res.send(err.message);
// 	};
// });

// colors.delete('/:id', async (req, res) => {
// 		const color = await Roygbiv.findByIdAndRemove(req.params.id);
// 		await Word.remove({ color: color._id});
// 		res.redirect('/roygbiv');
// });



//Listners
module.exports = colors;

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

colors.get('/create', (req, res)=>{
	res.render('roygbiv/create.ejs');
});

colors.get('/:id', async (req, res) => {
	try {
		const foundAColor = await Roygbiv.findById(req.params.id);
		res.render('roygbiv/read.ejs', {color: foundAColor});
	} catch (err) {
		res.send (err.message);
	};
});


//POST DELETE AND UPDATE DISABLED FOR LIVE SITE

colors.post('/', async (req, res) => {
	try {
		const createdColor = await Roygbiv.create(req.body);
		// res.send(createdColor)
		res.redirect('/roygbiv');
	} catch (err) {
		res.send(err.message);
	};
});
//
// colors.delete('/:id', (req, res) => {
// 	Roygbiv.findByIdAndRemove(req.params.id, (err, foundAColor) => {
// 		const wordIDs = [];
// 		for (let i = 0; i < foundAColor.words.length; i++) {
// 			wordIDs.push(foundAColor.words[i]._id);
// 		}
// 		Word.remove(
// 			{
// 				_id: {
// 					$in: wordIDs
// 				}
// 			},
// 			(err, data) => {
// 				res.redirect('/roygbiv');
// 			}
// 		);
// 	});
// });
//
// colors.get('/:id/update', (req, res) => {
// 	Roygbiv.findById(req.params.id, (err, foundAColor) => {
// 		res.render('roygbiv/update.ejs', {
// 			color: foundAColor
// 		})
// 	});
// });
//
// colors.put('/:id', (req, res) => {
// 	Roygbiv.findByIdAndUpdate(req.params.id, req.body, () => {
// 		res.redirect('/roygbiv');
// 	});
// });

//Seed Route
//@roygbiv/seed/roygbiv
// const colorSeeds = require ('../models/colorseed.js');
// 	colors.get ('/seed/roygbiv', (req, res) => {
// 		Roygbiv.insertMany (colorSeeds, (err, colors) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				res.redirect('/roygbiv');
// 			}
// 		});
// 	});

//Listners
module.exports = colors;

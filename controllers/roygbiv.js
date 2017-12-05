//Global Variables
const express 	= require('express');
const router 		= express.Router();
const Roygbiv 	= require('../models/roygbiv.js');
const Word 			= require('../models/words.js')

//Restful Routes
router.get('/', (req, res)=>{
	Roygbiv.find({}, (err, foundColors) => {
		res.render('roygbiv/index.ejs', {
			colors: foundColors
		});
	});
});

router.get('/create', (req, res)=>{
	res.render('roygbiv/create.ejs');
});

router.get('/:id', (req, res) => {
	Roygbiv.findById(req.params.id, (err, foundAColor) => {
		res.render('roygbiv/read.ejs', {
			color: foundAColor
		});
	});
});

//======================
//For development only
router.get('/data/json', async (req,res) => {
	try {
		const allRoygbiv = await Roygbiv.find();
		res.send ( allRoygbiv );
	} catch (err) {
		res.send( err.message );
	};
});
//======================


//POST DELETE AND UPDATE DISABLED FOR LIVE SITE

// router.post('/', (req, res) => {
// 	Roygbiv.create(req.body, (err, createdColor)=>{
// 		res.redirect('/roygbiv');
// 	});
// });
//
// router.delete('/:id', (req, res) => {
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
// router.get('/:id/update', (req, res) => {
// 	Roygbiv.findById(req.params.id, (err, foundAColor) => {
// 		res.render('roygbiv/update.ejs', {
// 			color: foundAColor
// 		})
// 	});
// });
//
// router.put('/:id', (req, res) => {
// 	Roygbiv.findByIdAndUpdate(req.params.id, req.body, () => {
// 		res.redirect('/roygbiv');
// 	});
// });

//Seed Route
//@roygbiv/seed/roygbiv
// const colorSeeds = require ('../models/colorseed.js');
// 	router.get ('/seed/roygbiv', (req, res) => {
// 		Roygbiv.insertMany (colorSeeds, (err, colors) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				res.redirect('/roygbiv');
// 			}
// 		});
// 	});

//Listners
module.exports = router;

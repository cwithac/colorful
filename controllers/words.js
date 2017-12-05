//Global Variables
const express 	= require('express');
const thesaurus = express.Router();
const Word      = require('../models/words.js');
const Roygbiv   = require('../models/roygbiv.js');

//Restful Routes
thesaurus.get('/', async (req, res) => {
  try {
    const foundWords = await Word.find().sort({name: 1}).populate('roygbiv');
    res.render('words/index.ejs', {foundWords});
  } catch (err) {
    res.send(err.message);
  };
});

thesaurus.get('/create', async (req, res) => {
  try {
    const allColors = await Roygbiv.find();
    res.render('words/create.ejs', { colors: allColors });
  } catch (err) {
    res.send(err.message);
  };
});

thesaurus.post('/', async (req, res) => {
  if (req.body.name === "") {
    req.body.name = '?';
  }
  if (req.body.hex === '') {
    req.body.hex = '#AAAAAA';
  }
  if (req.body.hex.length != 7) {
    req.body.hex = '#AAAAAA';
  }
  try {
    const createdWord = await Word.create(req.body);
    const foundColor = await Roygbiv.findOne({'_id': createdWord.color});
    res.render('words/read.ejs', {foundWord: createdWord, foundColor});
  } catch (err) {
    res.send(err.message);
  };
});

thesaurus.get('/:id', async (req, res) => {
  try {
    const foundWord = await Word.findById(req.params.id).sort({name: 1});
    const foundColor = await Roygbiv.findOne({'_id': foundWord.color});
    res.render('words/read.ejs', { foundColor, foundWord });
  } catch (err) {
    res.send(err.message);
  };
});

thesaurus.delete('/:id', async (req, res) => {
  try {
    const deletedWord = await Word.findByIdAndRemove(req.params.id);
    const foundColor = await Roygbiv.findOne({'_id': deletedWord.color});
    res.redirect('/roygbiv/' + foundColor.id)
  } catch (err) {
    res.send(err.message);
  };
});

thesaurus.get('/:id/update', async (req, res) => {
  try {
    const foundWord = await Word.findById(req.params.id);
    const allColors = await Roygbiv.find();
    const foundColor = await Roygbiv.find({'_id': foundWord.color});
    res.render('words/update.ejs', {colors: allColors, color: foundColor, word: foundWord});
  } catch (err) {
    res.send(err.message);
  };
});

thesaurus.put('/:id', async (req, res) => {
  try {
    const updatedWord = await Word.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect('/words/' + updatedWord.id)
  } catch (err) {
    res.send(err.message);
  };
});

//Seed Route
//@words/seed/words
//COLOR IS REFLECTION OF DEVELOPER MONGO ID - MUST BE UPDATED FOR USE
const wordSeeds = require ('../models/wordseed.js');
	thesaurus.get ('/seed/words', async (req, res) => {
		try {
			const allTheWords = await Word.insertMany(wordSeeds);
			res.redirect('/words');
		} catch (err) {
			res.send(err.message);
		};
	});

//Listners
module.exports = thesaurus;

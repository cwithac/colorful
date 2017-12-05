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
    const foundWord = await Word.findById(req.params.id);
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
    // res.send({colors: allColors, color: foundColor, word: foundWord})
    res.render('words/update.ejs', {colors: allColors, color: foundColor, word: foundWord});
  } catch (err) {
    res.send(err.message);
  };
  // Word.findById(req.params.id, (err, foundWord) => {
  //   Roygbiv.find({}, (err, allColors) => {
  //     Roygbiv.findOne({'words._id':req.params.id}, (err, foundWordColor) => {
  //       res.render('words/update.ejs', {
  //         word: foundWord,
  //         colors: allColors,
  //         wordColor: foundWordColor
  //       });
  //     });
  //   });
  // });
});

thesaurus.put('/:id', (req, res) => {
  Word.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedWord) => {
    Roygbiv.findOne({'words._id' : req.params.id }, (err, foundColor) => {
      if(foundColor._id.toString() !== req.body.colorID){
        foundColor.words.id(req.params.id).remove();
        foundColor.save((err, savedFoundColor) => {
          Roygbiv.findById(req.body.colorID, (err, newColor) => {
            newColor.words.push(updatedWord);
            newColor.save((err, savedFoundColor) => {
              res.redirect('/roygbiv/' + foundColor.id)
            });
          });
        });
      } else {
        foundColor.words.id(req.params.id).remove();
        foundColor.words.push(updatedWord);
        foundColor.save((err, data) => {
          res.redirect('/roygbiv/' + foundColor.id)
        });
      }
    });
  });
});

//Listners
module.exports = thesaurus;

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

thesaurus.get('/create', (req, res) => {
  Roygbiv.find({}, (err, allColors)=>{
    res.render('words/create.ejs', {
      colors: allColors
    });
  })
});

thesaurus.post('/', (req, res) => {
  if (req.body.name === "") {
    req.body.name = '?'
  }
  if (req.body.hex === '') {
    req.body.hex = '#AAAAAA'
  }
  Roygbiv.findById(req.body.roygbivId, (err, foundColor)=>{
    Word.create(req.body, (err, createdWord) => {
      foundColor.words.push(createdWord);
      foundColor.save((err, data)=>{
        res.redirect('/roygbiv/' + req.body.roygbivId);
      });
    });
  });
});

thesaurus.get('/:id', (req, res) => {
  Word.findById(req.params.id, (err, foundWord)=>{
    Roygbiv.findOne({'words._id':req.params.id}, (err, foundColor)=>{
      res.render('words/read.ejs', {
        color: foundColor,
        word: foundWord
      });
    });
  });
});

thesaurus.delete('/:id', (req, res) => {
  Word.findByIdAndRemove(req.params.id, () => {
    Roygbiv.findOne({'words._id':req.params.id}, (err, foundColor) => {
      foundColor.words.id(req.params.id).remove();
      foundColor.save((err, data) => {
        res.redirect('/roygbiv/' + foundColor.id)
      })
    })
  });
});

thesaurus.get('/:id/update', (req, res) => {
  Word.findById(req.params.id, (err, foundWord) => {
    Roygbiv.find({}, (err, allColors) => {
      Roygbiv.findOne({'words._id':req.params.id}, (err, foundWordColor) => {
        res.render('words/update.ejs', {
          word: foundWord,
          colors: allColors,
          wordColor: foundWordColor
        });
      });
    });
  });
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

// //======================
// //For development only
// thesaurus.get('/data/json', async (req,res) => {
// 	try {
// 		const allTheColors = await Word.find();
// 		res.send ( allTheColors );
// 	} catch (err) {
// 		res.send( err.message );
// 	};
// });
// //======================

//Listners
module.exports = thesaurus;

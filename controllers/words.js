//Global Variables
const express 	= require('express');
const router 		= express.Router();
const Word      = require('../models/words.js');
const Roygbiv   = require('../models/roygbiv.js');

//Restful Routes
router.get('/', (req, res) => {
  Word.find({}, (err, foundWords)=> {
    res.render('words/index.ejs', {
      words: foundWords
    });
  });
});

router.get('/create', (req, res) => {
  Roygbiv.find({}, (err, allColors)=>{
    res.render('words/create.ejs', {
      colors: allColors
    });
  })
});

router.post('/', (req, res) => {
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

router.get('/:id', (req, res) => {
  Word.findById(req.params.id, (err, foundWord)=>{
    Roygbiv.findOne({'words._id':req.params.id}, (err, foundColor)=>{
      res.render('words/read.ejs', {
        color: foundColor,
        word: foundWord
      });
    });
  });
});

router.delete('/:id', (req, res) => {
  Word.findByIdAndRemove(req.params.id, () => {
    Roygbiv.findOne({'words._id':req.params.id}, (err, foundColor) => {
      foundColor.words.id(req.params.id).remove();
      foundColor.save((err, data) => {
        res.redirect('/words')
      })
    })
  });
});

router.get('/:id/update', (req, res) => {
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

router.put('/:id', (req, res) => {
  Word.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedWord) => {
    Roygbiv.findOne({'words._id' : req.params.id }, (err, foundColor) => {
      if(foundColor._id.toString() !== req.body.colorID){
        foundColor.words.id(req.params.id).remove();
        foundColor.save((err, savedFoundColor) => {
          Roygbiv.findById(req.body.colorID, (err, newColor) => {
            newColor.words.push(updatedWord);
            newColor.save((err, savedFoundColor) => {
              res.redirect('/words/' + req.params.id);
            });
          });
        });
      } else {
        foundColor.words.id(req.params.id).remove();
        foundColor.words.push(updatedWord);
        foundColor.save((err, data) => {
          res.redirect('/words/' + req.params.id);
        });
      }
    });
  });
});

//Listners
module.exports = router;

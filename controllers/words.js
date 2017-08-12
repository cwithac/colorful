//Global Variables
const express 	= require('express');
const router 		= express.Router();
const Word      = require('../models/words.js');

//Restful Routes
router.get('/', (req, res) => {
  Word.find({}, (err, foundWords)=> {
    res.render('words/index.ejs', {
      words: foundWords
    });
  });
});

router.get('/create', (req, res) => {
  res.render('words/create.ejs');
});

router.post('/', (req, res) => {
  Word.create(req.body, (err, createdWord) => {
    res.redirect('/words')
  });
});

router.get('/:id', (req, res) => {
  Word.findById(req.params.id, (err, foundWord)=>{
    res.render('words/read.ejs', {
      word: foundWord
    });
  });
});

router.delete('/:id', (req, res) => {
  Word.findByIdAndRemove(req.params.id, () => {
    res.redirect('/words')
  });
});

router.get('/:id/update', (req, res) => {
  Word.findById(req.params.id, (err, foundWord) => {
    res.render('words/update.ejs', {
      word: foundWord
    });
  });
});

router.put('/:id', (req, res) => {
  Word.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect('/words');
  });
});

//Listners
module.exports = router;

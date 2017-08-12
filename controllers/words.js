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


//Listners
module.exports = router;

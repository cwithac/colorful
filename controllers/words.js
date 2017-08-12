//Global Variables
const express 	= require('express');
const router 		= express.Router();

//Restful Routes
router.get('/', (req, res) => {
  res.render('words/index.ejs');
});


//Listners
module.exports = router;

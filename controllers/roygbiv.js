//Global Variables
const express 	= require('express');
const router 		= express.Router();
const Roygbiv 		= require('../models/roygbiv.js');

//Restful Routes
router.get('/', (req, res)=>{
	res.render('roygbiv/index.ejs');
});

router.get('/create', (req, res)=>{
	res.render('roygbiv/create.ejs');
});

router.post('/', (req, res) => {
	Roygbiv.create(req.body, (err, createdColor)=>{
		res.redirect('/roygbiv');
	});
});

//Listners
module.exports = router;

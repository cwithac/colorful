//Global Variables
const express = require('express');
const router = express.Router();

//Restful Routes
router.get('/', (req, res)=>{
	res.render('roygbiv/index.ejs');
});

router.get('/create', (req, res)=>{
	res.render('roygbiv/create.ejs');
});

//Listners
module.exports = router;

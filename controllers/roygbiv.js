//Global Variables
const express = require('express');
const router = express.Router();

//Restful Routes
router.get('/', (req, res)=>{
	res.render('roygbiv/index.ejs');
});

//Listners
module.exports = router;

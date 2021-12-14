var express = require('express');
var router = express.Router();
const connection = require('../mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
 // res.send("This is[ / ]directroy");
  res.render('index', {title : 'e'})
});

router.post('/', function(req, res, next){

  
});

module.exports = router;
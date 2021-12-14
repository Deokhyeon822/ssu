var express = require('express');
var router = express.Router();
const connection = require('../mysql')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('account', {title : 'e'})
});

router.post('/', function(req, res, next) {
  res.render('account', {title : 'e'})

  connection.connect()
  connection.query('SELECT * FROM USER', (error, rows, fields) =>{
    if(error) throw error;
   // console.log('User info is : ', rows)
})
  
  console.log(req.body.userId);
  
});

module.exports = router;
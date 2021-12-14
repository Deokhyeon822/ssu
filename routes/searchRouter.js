var express = require('express');
var router = express.Router();
const db = require('../mysql2');
const connection = require('../mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
 // res.send("This is[ / ]directroy");
  res.render('index', {title : 'e'})
});

router.post('/', async function(req, res, next){
    var searchReq = req.body.searchReq
    var searchInput = '%' +req.body.searchInput + '%'
    var user = req.user
    var same = 0;
    if(req.body.same){
        same = 1;
        searchInput = req.body.searchInput
    }
    console.log(searchReq,searchInput)
    
    try{
        var toPage = 1;
    
        if(req.query.toPage){ 
          toPage = req.query.toPage
          
        }
        //req.user에 user가 있음
        if(same) sql = 'select user_id, posted_date, hash_tag, content from content where ' + searchReq + ' = ?'
        else sql = 'select user_id, posted_date, hash_tag, content from content where ' + searchReq + ' like ?'
        var result = await db('s', sql, [searchInput])
        
        console.log('##searched result' + 'same : ' + same , result.rows)
        
        res.render('homeSearched', {user : user, postInfo : result.rows, postCnt : result.rows.length, searchReq :searchReq, same:same, nowPage : toPage})
    }
    catch(err){
        console.log('home.get.err!')
        console.log(err)
    }
  
});

module.exports = router;
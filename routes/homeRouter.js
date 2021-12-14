const express = require('express');
const router = express.Router();
const db = require('../mysql2');
const multer = require('multer');

// 기타 express 코드
const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });


/* GET home page. */
//login success 시 get으로 올건데...
router.get('/',   async function(req, res, next) { 
  try{
    var toPage = 1;
    
    if(req.query.toPage){ 
      toPage = req.query.toPage
      
    }

    var temp = await db('s', 'select count(content_no) c from content');
    var postCnt = temp.rows[0].c;
    console.log('postCnt : ' + postCnt, 'toPage : ' + toPage)
  //req.user에 user가 있음
  var user = req.user
  var sql = 'select content_no, user_id, posted_date, hash_tag, content from content'
  var pagingSql = ' order by content_no limit 9 offset ' + (toPage-1)*9
  var result = await db('s',sql+pagingSql , [])
  console.log('result', result.rows)
  res.render('home', {user : user, postInfo : result.rows, postCnt : postCnt, nowPage : toPage})
}
catch(err){
  console.log('home.get.err!')
  console.log(err)
}
});

router.post('/', function(req, res, next) {
  res.send('post')
  //res.render('home', {title : 'e'})
});

module.exports = router;
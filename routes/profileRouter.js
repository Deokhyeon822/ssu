var express = require('express');
var router = express.Router();
const connection = require('../mysql')

/* GET home page. */
router.post('/', function(req, res, next) {
  res.send(req.body.userId + " " + req.body.userPassword);
});

router.get("/", function(req, res) {
  var user = req.user
  var followerCount = 0
  var followedCount = 0
  connection.query('select count(follower) count from following where follower = ?', [req.user.userId], function(err, rows){
    
    if(rows.length){

      followerCount = rows[0].count;
      console.log('follower count : ' + followerCount );

      connection.query('select count(followed) count from following where followed = ?', [user.userId], function(rows, err){
        if(!err){
          if(rows.length){
            followedCount = rows[0].count;
            console.log('followed count : ' + followedCount );     
          }
            
        }
      })
  }
  res.render("profile", {user: user, followerCount: followerCount, followedCount: followedCount  });
  })

 
  
})
    

module.exports = router;
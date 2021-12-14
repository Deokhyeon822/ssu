var express = require('express');
const { values } = require('sequelize/dist/lib/operators');
const { now } = require('sequelize/dist/lib/utils');
const db = require('../mysql2');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  var notFollowed
  var user

 
  user = req.user;
  temp = await db('s', ' select followed from following where follower = ? ', '1');
  nowFollowing = []
  for(var i=0; i < temp.rows.length; i++){
    nowFollowing[i] = temp.rows[i].followed;
  }

  notFollowed = []
  temp2 = await db('s', 'select user_id from user where user_id not in (?)', nowFollowing);
  for(var i=0; i < temp2.rows.length; i++){
    notFollowed[i] = temp2.rows[i].user_id;
  }


  console.log(notFollowed);
  console.log(nowFollowing);

  res.render('follow', {nowFollowing : nowFollowing, notFollowed : notFollowed})


});

module.exports = router;
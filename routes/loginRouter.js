const express = require('express');
const router = express.Router();
const passport = require('passport')
LocalStrategy = require('passport-local').Strategy

const connection = require('../mysql');
const expressSession = require('express-session')
const flash = require('connect-flash')
//const passport = require('../passport.js');
/* GET home page. */

passport.use('local-login', new LocalStrategy({
  usernameField: 'userId',
  passwordField: 'userPassword',
  passReqToCallback: true
}, (req, userId, userPassword, done)=>{
  console.log('###login-join req.body start')
  console.log(req.body);
  console.log('###login-join req.body end')
  connection.query('select user_id, user_name, user_email from user where user_id = ?', [userId], function(err,rows){
    if(rows.length){
      var userId = rows[0].user_id;
      var userName = rows[0].user_name;
      var userEmail = rows[0].user_email;
      return done(null, {
        userId : userId,
        userName : userName,
        userEmail: userEmail
    })
   }
   else{
    return done(null, false, req.flash('loginMessage', '로그인 실패'))
   }
  })
  
  console.log('비밀번호 일치!')
  
  

}))

router.get('/', function(req, res, next) {
  res.send('GET LOGIN 호출')
});

router.post('/', passport.authenticate('local-login', {
    successRedirect : '/home', //get home
    failureRedirect : '/loginFail', //get 
    failureFlash : true
}) )

module.exports = router;
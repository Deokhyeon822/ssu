const express = require('express');
const router = express.Router();

const expressSession = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
LocalStrategy = require('passport-local').Strategy

const connection = require('../mysql');

// 비동기 방식에 익숙하지 않아 이렇게 만듬...
// 추후 async await을 이용하여 보완해야 할 필요성 있음
passport.use('local-join', new LocalStrategy({
  
    usernameField : 'userId',
    passwordField : 'userPassword',
    passReqToCallback : true
    }, function(req, userId, userPassword, done){
      console.log('###local-join start')
      var dupId = 0;
      var dupEmail = 0;
    //인증처리부분 작성  (회원가입처리였음.. ver2)
    //console.log('local-join callback called');
      
    connection.query('select * from user where user_id = ?', [userId], function(err,rows){
        if(err) return done(err);
        if(rows.length){
          dupId = 1;
          console.log('exsited user id' + dupId);

          connection.query('select * from user where user_email = ?', [req.body.userEmail], function(err,rows){
            if(err) return done(err);
            if(rows.length){
              dupEmail = 1;
              console.log('existde user email' + dupEmail);
              return done(null, false, {message : 'your id, email already used'})
            }
            else return done(null, false, {message : 'your id already used'})
          })
             
            //return done(null, false, {message : 'your id is already used'})
        }
        else{
          connection.query('select * from user where user_email = ?', [req.body.userEmail], function(err,rows){
            if(err) return done(err);
            if(rows.length){
              dupEmail = 1;
              console.log('existed user email');
              return done(null, false, {message : 'your email already used'})
            }
          })
        }
      })
    } 

    
));

passport.serializeUser(function(user, done){
  console.log('###serialize session save : ', user.userId)
  done(null, {userId : user.userId, userName : user.userName, userEmail:user.userEmail});
});

//요청시 세션값 뽑아서 페이지 전달 
passport.deserializeUser(function(user, done){
  console.log('###deserialize :: passport session get id : ', user)
  done(null, user); // passport를 사용하면 성공시 가는 페이지의 req에 user라는 것을 만들어 줌(done의 두 번쨰 인자)
})


router.get('/', function(req, res, next) {
  res.send('GET APPLY USER 호출')
});


router.post('/', passport.authenticate('local-join', {
  
    successRedirect : '/home',
    failureRedirect : '/accountFail',
    failureFlash : true

}))

module.exports = router;
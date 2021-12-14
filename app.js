const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer')
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
}); //dest : 저장 위치
const session = require('express-session')
const helmet = require('helmet');
const assert = require('assert')
const flash = require('connect-flash')
const passport = require('passport')
const app = express();
const routes = require('./routes/indexRouter');//
//const passport = require('./passport.js')

const LocalStrategy = require('passport-local').Strategy;

const port = 3000;

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
//const indexRouter = require('./routes/main');
//const usersRouter = require('./routes/users');

app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("public"));
app.use(express.static("uploads"))
// session을 먼저 설정 후 passport를 initialize, passaport.session을 처리해야함
app.use(session({
  secret: 'my Key',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


app.use('/', routes);


/*app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})
*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
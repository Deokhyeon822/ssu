var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/msg', function(req, res, next) {
  res.send("This is[ /msg ]directroy");
});

module.exports = router;
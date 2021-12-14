var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/edit', function(req, res, next) {
  res.send("This is[ /edit ]directroy");
});

module.exports = router;
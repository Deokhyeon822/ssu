const multer = require('multer');
const express = require('express');
const router = express.Router();
const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });

/* GET home page. */
router.get('/msg', function(req, res, next) {
  res.send("This is[ /msg ]directroy");
});


module.exports = router;
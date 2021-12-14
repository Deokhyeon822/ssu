
const express = require('express');
const router = express.Router();

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



/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("This is[ /msg ]directroy");
});

router.post('/',upload.single('img'),(req,res) => {
  res.json(req.file)
  console.log(req.file)
})


module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.logout();
    req.session.save(function(){
        res.redirect('/');
    })
});

router.post('/', function(req, res, next) {
    req.logout();
    req.session.save(function(){
        res.redirect('/home');
    })
});

module.exports = router;
const express = require('express');
const router = express.Router();

const main = require('./mainRouter.js');
const account = require('./accountRouter.js')
const profile = require('./profileRouter.js');
const edit = require('./editRouter')
const follow = require('./followRouter')
const home = require('./homeRouter.js')
const msg = require('./msgRouter')
const new_page = require('./newRouter')
const login = require('./loginRouter')
const applyUser = require('./applyUserRouter')
const logout = require('./logoutRouter')
const search = require('./searchRouter')
const uploadImage = require('./uploadImage')

router.use('/', main); // 초기화면
router.use('/account', account); // 사용자 등록
router.use('/profile', profile); // 사용자 소개
router.use('/edit', edit);
router.use('/follow', follow);
router.use('/home', home);
router.use('/msg', msg)
router.use('/new', new_page)
router.use('/login', login)
router.use('/applyUser', applyUser)
router.use('/logout', logout)
router.use('/uploadImage', uploadImage)
router.use('/search', search)


router.get('/loginFail', function(req, res, next) {
    res.render('loginFail')
});

router.get('/accountFail', function(req, res, next) {
    res.render('accountFail')
});


module.exports = router;
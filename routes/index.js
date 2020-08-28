const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const usersController = require('../controllers/users_controller');

console.log('router loaded');


router.get('/', homeController.home);
router.get('/password_reset/:accesstoken',usersController.resetpassFormGet);
router.post('/password_reset/:accesstoken',usersController.resetpassFormPost);
router.use('/users', require('./users'));
router.use('/posts',  require('./posts'));
router.use('/comments',require('./comments'));
router.use('/api',require('./api'));
router.use('/likes',require('./likes'));
//for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;
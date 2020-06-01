const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);

router.get('/login',usersController.login);
router.post('/loginS',usersController.loginS);

router.get('/signup',usersController.signup);
router.post('/signupS',usersController.signupS);

module.exports = router;
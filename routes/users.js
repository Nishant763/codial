const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);

router.get('/log-in',usersController.login);
router.post('/create-session',usersController.create_session);

router.get('/sign-up',usersController.signup);
router.post('/create',usersController.create);
router.post('/log-out',usersController.logout);

module.exports = router;
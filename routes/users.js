const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');


router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);

router.get('/log-in',usersController.login);
router.get('/log-out',usersController.destroySession);

router.get('/sign-up',usersController.signup);
router.post('/create',usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
        'local',
        {
            failureRedirect: '/users/log-in',
            failureFlash:true
        }
    )
,usersController.create_session);

router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));


router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/users/log-in'}),usersController.create_session);

module.exports = router;
const express = require('express');
const Router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

Router.post('/create',passport.checkAuthentication,commentsController.create);

module.exports = Router;
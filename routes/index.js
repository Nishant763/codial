const express = require('express');
const Router = express.Router();
const homeController = require('../controllers/home_controller');

console.log("Routes Loaded");

Router.get('/', homeController.home);
Router.get('/aboutus', homeController.aboutUs);
Router.get('/users/',require('./users'));
Router.get('/posts/',require('./posts'));

module.exports = Router;
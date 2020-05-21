const express = require('express');
const Router = express.Router();
const homeController = require('../controllers/home_controller');

console.log("Routes Loaded");
Router.use('/users',require('./users'));
Router.use('/posts',require('./posts'));


Router.get('/', homeController.home);
Router.get('/aboutus', homeController.aboutUs);

module.exports = Router;
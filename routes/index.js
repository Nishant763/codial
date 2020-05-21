const express = require('express');
const Router = express.Router();
const homeController = require('../controllers/home_controller');

console.log("Routes Loaded");

Router.get('/', homeController.home);

module.exports = Router;
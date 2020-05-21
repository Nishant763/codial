const express = require('express');
const Router = express.Router();

const PostsController = require('../controllers/posts_controller');

Router.get('/viewpost',PostsController.viewPost);
Router.get('/addpost',PostsController.addPost);
Router.get('/deletepost',PostsController.deletePost);

module.exports = Router;
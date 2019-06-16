const express = require('express');
const multer = require('multer');
const postController = require('./controllers/post-controller');
const likeController = require('./controllers/like-controller');
const routes = express.Router();

const uploadConfig = require('./config/uploads');
const upload = multer(uploadConfig);

routes.post('/posts', upload.single('image'), postController.create);
routes.get('/posts', postController.getImages);
routes.post('/posts/:id/like', likeController.addLike);

module.exports = routes;
const Post = require('../models/post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

exports.create = async (req, res) => {
  console.log(req.body);
  const { author, description, place, hashtags } = req.body;
  const { filename: image } = req.file;

  const [name] = image.split('.');
  const fileName = `${name}.jpg`;

  await sharp(req.file.path)
    .resize(500)
    .jpeg({ quality: 75 }) 
    .toFile(
      path.resolve(req.file.destination, 'resized', fileName)
    )

  fs.unlinkSync(req.file.path); // delete image unused
  
  const post = await Post.create({
    author,
    description,
    place, 
    hashtags,
    image: fileName,
  });

  req.io.emit('post', post);

  return res.status(200).send(post);
};

exports.getImages = async (req, res) => {
  const posts = await Post.find().sort('-createdAt');

  return res.status(200).send(posts);
};  
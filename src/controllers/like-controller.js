const Post = require('../models/post');

exports.addLike = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.like += 1;
  await post.save();

  req.io.emit('like', post);

  return res.status(200).send(post);
};
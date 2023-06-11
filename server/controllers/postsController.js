const Post = require('../model/Post');
const User = require('../model/User');

const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({updatedAt:-1});
    res.status(200).json(posts)
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params
    const posts = await Post.findById(userId);
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const { userId } = req.body
    console.log(userId)
    const post = await Post.findById(id);
    console.log(post)
    const isLiked = post.likes.get(userId)
    console.log(isLiked)

    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId, true)
    }
    console.log(post)
    // const updatedPost = await Post.findByIdAndUpdate(
    //   id,
    //   { likes: post.likes },
    //   { new: true }
    // )
    // await Post.updateOne({_id: id},{$set: {likes: post.likes}})
    await post.save()
    // res.status(200).json(updatedPost);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body
    const user = await User.findById(userId)
    console.log(user)
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    })

    console.log(newPost)
    await newPost.save()

    const posts = await Post.find().sort({updatedAt: -1})
    res.status(201).json(posts)
  } catch (err) {
    res.status(409).json({ message: err.message })
    
  }
};

module.exports = { getFeedPosts, getUserPosts, likePost, createPost };
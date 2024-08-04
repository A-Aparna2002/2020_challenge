const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Post = mongoose.model("Post");
require('dotenv').config();

router.post('/setProfilePic', (req, res) => {
  const { email, profilePic } = req.body;
  
    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Credentials" })
            }
            savedUser.profilePic = profilePic;
            savedUser.save()
                .then(user => {
                    res.json({ message: "Profile picture updated successfully" })
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
})

router.post('/addBookPost', async (req, res) => {
  const { email, post, postDescription } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    const newPost = await new Post({
      user: user._id,
      image: post,
      caption: postDescription,
    }).save();

    user.posts1.push({ postId: newPost._id, post: post, postDescription: postDescription });
    await user.save();

    res.json({ message: "Post added successfully" });
  } catch (err) {
    console.log(err);
    res.json({ error: "Error adding post" });
  }
});

router.post('/addMoviePost', async (req, res) => {
  const { email, post, postDescription } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }
    const newPost = await new Post({
      user: user._id,
      image: post,
      caption: postDescription,
    }).save();

    user.posts2.push({ postId: newPost._id, post: post, postDescription: postDescription });
    await user.save();

    res.json({ message: "Post added successfully" });
  } catch (err) {
    console.log(err);
    res.json({ error: "Error adding post" });
  }
});

router.delete('/deletePost/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    console.log('Attempting to delete post with ID:', postId);

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const user = await User.findOne({
      $or: [
        { 'posts1.postId': post._id },
        { 'posts2.postId': post._id },
      ],
    });

    if (user) {
      user.posts1 = user.posts1.filter(p => p.postId.toString() !== postId);
      user.posts2 = user.posts2.filter(p => p.postId.toString() !== postId);

      await user.save();
      await post.remove();

      return res.json({ message: 'Post deleted successfully' });
    } else {
      return res.status(404).json({ message: 'User not found for the post' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', ['profilePic', 'username'])
      .sort({ createdAt: 'desc' });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

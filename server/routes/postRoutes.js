import express from "express";
import Post from "../models/Post.js";

const router = express.Router();


// CREATE POST

router.post("/", async (req, res) => {

  try {

    const {
      title,
      content,
      author,
      userId
    } = req.body;

    const newPost = new Post({
      title,
      content,
      author,
      userId
    });

    await newPost.save();

    res.status(201).json(newPost);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// GET ALL POSTS

router.get("/", async (req, res) => {

  try {

    const posts = await Post.find();

    res.json(posts);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// UPDATE POST

router.put("/:id", async (req, res) => {

  try {

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPost);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// DELETE POST

router.delete("/:id", async (req, res) => {

  try {

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      message: "Post deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
// ADD COMMENT

router.post("/:id/comment", async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    post.comments.push(req.body);

    await post.save();

    res.json(post);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
// LIKE POST

router.put("/:id/like", async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    res.json(post);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
export default router;
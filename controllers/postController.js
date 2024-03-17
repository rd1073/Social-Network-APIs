const { Post } = require("../models/postModel");
const mongoose = require("mongoose")



// Create a new post
const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id ;// Assuming user ID is stored in req.user.id

    // Convert user ID string to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);
    // Create a new post instance
    const newPost = new Post({
      content,
      user: userObjectId,
      createdAt: new Date(),
    });

    // Save the post to the database
    const post = await newPost.save();

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};


//get posts of a user
// Get posts of logged-in user
 // Get posts of logged-in user with pagination
 const getUserPosts = async (req, res) => {
    try {
      const userId = req.user.id; // Assuming user ID is stored in req.user.id
      const page = parseInt(req.body.page) || 1; // Current page (default: 1)
      const perPage =  2; // Posts per page (default: 2)
  
      // Calculate the skip value based on the current page and posts per page
      const skip = (page - 1) * perPage;
  
      // Find all posts belonging to the user with pagination
      const userPosts = await Post.find({ user: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage);
  
      res.status(200).json(userPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  };
  

//get all the posts with pagination
  const getAllPosts = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Current page (default: 1)
      const perPage =  2; // Posts per page (default: 10)
  
      // Calculate the skip value based on the current page and posts per page
      const skip = (page - 1) * perPage;
  
      // Find all posts with pagination
      const posts = await Post.find()
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip(skip)
        .limit(perPage);
  
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  };
  


 
  // Get single post by ID from req.body
const getPostById = async (req, res) => {
    try {
      const postId = req.body.postId; // Extract postId from req.body
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  };
  
 
  // Update a post
const updatePost = async (req, res) => {
    try {
      const { postId, content } = req.body; // Extract postId and content from req.body
      const userId = req.user.id; // Assuming user ID is stored in req.user.id
  
      if (!userId) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { content },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ msg: "Post not found" });
      }
  
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  };
  

 // Delete a post
const deletePost = async (req, res) => {
    try {
      const postId = req.body.postId; // Extract postId from req.body
  
      const deletedPost = await Post.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.status(404).json({ msg: "Post not found" });
      }
  
      res.status(200).json({ msg: "Post deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  };
  
module.exports = { createPost, getAllPosts,  getUserPosts,  getPostById, deletePost, updatePost };

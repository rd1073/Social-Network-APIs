const express = require("express");
const router = express.Router();
const {createPost,getUserPosts, getAllPosts, getPostById, deletePost, updatePost} = require("../controllers/postController");
const { protect }=require("../config/auth")



// Routes for posts
router.post("/create-post", protect, createPost);
router.post("/get-user-post", protect, getUserPosts);
router.post("/get-all-post", protect, getAllPosts);
router.post("/get-post-by-id", protect, getPostById);
router.post("/delete-post", protect, deletePost);
router.post("/update-post", protect, updatePost);





module.exports = router;

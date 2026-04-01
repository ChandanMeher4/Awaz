import express from "express";
import {
  createPost,
  replyToPost,
  getPost,
  updatePostStatus,
  getPublicPosts,   
  getPrivatePosts,
  getMyActivity,
  toggleLike
} from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; 
import { upload } from "../config/multer.js";     
 

const postRouter = express.Router();

// Create a new post (any logged-in user)
postRouter.post("/", authMiddleware, upload.single("media"), createPost);

postRouter.get("/public", getPublicPosts);
postRouter.get("/private", authMiddleware, getPrivatePosts);
postRouter.get("/my/activity", authMiddleware, getMyActivity);

// Admin reply to a post
postRouter.post("/reply/:postId",  replyToPost);

// Like a post
postRouter.patch("/:postId/like", authMiddleware, toggleLike);

// Get a post with replies
postRouter.get("/:postId", authMiddleware, getPost);

// Mark a post done/pending
postRouter.patch("/status/:postId",authMiddleware, updatePostStatus);

export default postRouter;

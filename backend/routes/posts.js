import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);     //Fetches all posts for the main feed, protected by verifyToken middleware to ensure only authenticated users can access it.
router.get("/:userId/posts", verifyToken, getUserPosts);    //Fetches posts created by a specific user, also protected by verifyToken.

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);           //Allows authenticated users to like or unlike a post by its ID.

export default router;

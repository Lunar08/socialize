import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);                     //Retrieves a user by their ID, protected by verifyToken.
router.get("/:id/friends", verifyToken, getUserFriends);      //Retrieves the friends list of a user, also protected by verifyToken.

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend); //allows an authenticated user to add or remove a friend by user ID.

export default router;

import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);       //this route handles user login requests by calling the login function from the auth controller.

export default router;

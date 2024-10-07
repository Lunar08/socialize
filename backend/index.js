import express from "express";                        // The core web framework for creating the server.
import bodyParser from "body-parser";                 //Middleware to handle JSON and URL-encoded data.
import mongoose from "mongoose";                      //ORM to connect and work with MongoDB
import cors from "cors";                              //Enables Cross-Origin Resource Sharing, allowing our API to be accessible from different domains
import dotenv from "dotenv";                          //Loads environment variables from a .env file
import multer from "multer";                          //Middleware to handle file uploads.
import helmet from "helmet";                          //Security middleware for setting various HTTP headers.
import morgan from "morgan";
import path from "path";                              //path and fileURLToPath: Utilities for handling and transforming file paths.
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);         //Allows user registration with a profile picture upload using the register controller.
app.post("/posts", verifyToken, upload.single("picture"), createPost);  //Allows creating a post with a picture using the createPost controller. This route is protected by the verifyToken middleware, ensuring only authenticated users can create posts

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

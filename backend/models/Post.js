import mongoose from "mongoose";

//This model represents the structure for a Post in the application. The schema defines the various fields and their types
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {    //A map containing user IDs as keys and a boolean value indicating whether the user liked the post.
      type: Map,
      of: Boolean,
    },
    comments: {   //An array to store comments on the post
      type: Array,
      default: [],
    },
  },
  { timestamps: true }    //This option automatically adds createdAt and updatedAt fields to the document
);

const Post = mongoose.model("Post", postSchema);

export default Post;

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);

export { PostModel };

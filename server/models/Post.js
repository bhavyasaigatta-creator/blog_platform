import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

  user: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

const postSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  userId: {
    type: String,
    required: true
  },

  likes: {
    type: Number,
    default: 0
  },

  comments: [commentSchema]

}, {
  timestamps: true
});

export default mongoose.model("Post", postSchema);
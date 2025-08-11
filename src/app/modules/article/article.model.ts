import mongoose, { Schema, Document } from "mongoose";
import { TArticle } from "./article.interface";

// Create the Article schema based on the interface
const ArticleSchema = new Schema<TArticle>(
  {
    title: {
      type: String,
      required: [true, "Article title is required"],
      unique: true,
    },
    image: {
      type: String,
      required: [true, "Article image is required"],
    },
    comments: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Article category is required"],
    },
    description: {
      type: String,
      required: [true, "Article description is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
const Article = mongoose.model<TArticle>("Article", ArticleSchema);
export default Article;

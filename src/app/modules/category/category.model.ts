import mongoose, { Schema } from "mongoose";
import { TCategory } from "./category.interface";

// Create the Category schema based on the interface
const CategorySchema = new Schema<TCategory>(
  {
    title: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<TCategory>("Category", CategorySchema);
export default Category;

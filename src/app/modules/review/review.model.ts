import mongoose, { Schema } from "mongoose";
import { TReview } from "./review.interface";

const ReviewSchema = new Schema<TReview>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
    },
    avatar: {
      type: String,
      required: [true, "Avatar URL is required"],
    },
    review: {
      type: String,
      required: [true, "Review text is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model<TReview>("Review", ReviewSchema);
export default Review;

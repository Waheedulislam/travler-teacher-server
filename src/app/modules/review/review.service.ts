import mongoose from "mongoose";
import { TReview } from "./review.interface";
import Review from "./review.model";

// Function to create a Teacher
const CreateReview = async (userData: TReview) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Create the Teacher document
    const Reviews = new Review(userData);
    const createReview = await Reviews.save({ session });

    await session.commitTransaction();
    return createReview;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllReview = async () => {
  const result = await Review.find();
  return result;
};

export const ReviewServices = {
  CreateReview,
  getAllReview,
};

import mongoose from "mongoose";
import { TCategory } from "./category.interface";
import Category from "./category.model";

// Function to create a category
const CreateCategory = async (userData: TCategory) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Create the category document
    const category = new Category(userData);
    const createdCategory = await category.save({ session });

    await session.commitTransaction();
    return createdCategory;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllCategory = async () => {
  const result = await Category.find();
  return result;
};

export const CategoryServices = {
  CreateCategory,
  getAllCategory,
};

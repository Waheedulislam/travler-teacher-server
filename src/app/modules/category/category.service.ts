import mongoose from "mongoose";
import { TCategory } from "./category.interface";
import Category from "./category.model";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";

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

const getSingleCategory = async (productId: string) => {
  const category = await Category.findById(productId);

  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, "Category not found");
  }
  return category;
};

export const CategoryServices = {
  CreateCategory,
  getAllCategory,
  getSingleCategory,
};

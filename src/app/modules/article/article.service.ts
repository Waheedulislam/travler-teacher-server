import mongoose from "mongoose";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import { TArticle } from "./article.interface";
import Article from "./article.model";

// Create Article
const CreateArticle = async (userData: TArticle) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const article = new Article(userData);
    const createdArticle = await article.save({ session });

    await session.commitTransaction();
    return createdArticle;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
  }
};

// Get all articles
const getAllArticle = async () => {
  const result = await Article.find();
  return result;
};

// Get single article by id
const getSingleArticle = async (articleId: string) => {
  const article = await Article.findById(articleId);

  if (!article) {
    throw new AppError(StatusCodes.NOT_FOUND, "Article not found");
  }
  return article;
};

// Update article by id
const updateArticle = async (
  articleId: string,
  updateData: Partial<TArticle>
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      updateData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    if (!updatedArticle) {
      throw new AppError(StatusCodes.NOT_FOUND, "Article not found");
    }

    await session.commitTransaction();
    return updatedArticle;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
  }
};

// Delete article by id
const deleteArticle = async (articleId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedArticle = await Article.findByIdAndDelete(articleId, {
      session,
    });

    if (!deletedArticle) {
      throw new AppError(StatusCodes.NOT_FOUND, "Article not found");
    }

    await session.commitTransaction();
    return deletedArticle;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
  }
};

export const ArticleServices = {
  CreateArticle,
  getAllArticle,
  getSingleArticle,
  updateArticle,
  deleteArticle,
};

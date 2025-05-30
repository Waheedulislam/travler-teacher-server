import mongoose from "mongoose";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import { TArticle } from "./article.interface";
import Article from "./article.model";

// Function to create a article
const CreateArticle = async (userData: TArticle) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Create the article document
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

const getAllArticle = async () => {
  const result = await Article.find();
  return result;
};

const getSingleArticle = async (articleId: string) => {
  const article = await Article.findById(articleId);

  if (!article) {
    throw new AppError(StatusCodes.NOT_FOUND, "Article not found");
  }
  return article;
};

export const ArticleServices = {
  CreateArticle,
  getAllArticle,
  getSingleArticle,
};

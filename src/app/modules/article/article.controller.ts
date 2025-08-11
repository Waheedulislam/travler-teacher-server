import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { ArticleServices } from "./article.service";

const CreateArticle = catchAsync(async (req: Request, res: Response) => {
  const result = await ArticleServices.CreateArticle(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Article created successfully!",
    data: {
      result,
    },
  });
});

const getAllArticle = catchAsync(async (req, res) => {
  const result = await ArticleServices.getAllArticle();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Articles retrieved successfully",
    data: { result },
  });
});

const getSingleArticle = catchAsync(async (req, res) => {
  const { articleId } = req.params;
  const result = await ArticleServices.getSingleArticle(articleId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Single article retrieved successfully",
    data: result,
  });
});

const updateArticle = catchAsync(async (req: Request, res: Response) => {
  const { articleId } = req.params;
  const updatedData = req.body;

  const result = await ArticleServices.updateArticle(articleId, updatedData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Article updated successfully",
    data: result,
  });
});

const deleteArticle = catchAsync(async (req: Request, res: Response) => {
  const { articleId } = req.params;

  await ArticleServices.deleteArticle(articleId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Article deleted successfully",
    data: {},
  });
});

export const ArticleController = {
  CreateArticle,
  getAllArticle,
  getSingleArticle,
  updateArticle,
  deleteArticle,
};

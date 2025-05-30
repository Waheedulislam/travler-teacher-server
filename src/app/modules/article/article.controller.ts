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
    message: "Article Created successfully!",
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
    message: "Articles are retrieved successfully",
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
export const ArticleController = {
  CreateArticle,
  getAllArticle,
  getSingleArticle,
};

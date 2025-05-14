import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { CategoryServices } from "./category.service";

const CreateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.CreateCategory(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category Created successfully!",
    data: {
      result,
    },
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategory();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Categories are retrieved successfully",
    data: { result },
  });
});

export const CategoryController = {
  CreateCategory,
  getAllCategory,
};

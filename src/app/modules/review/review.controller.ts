import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { ReviewServices } from "./review.service";

const CreateReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.CreateReview(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Review Created successfully!",
    data: {
      result,
    },
  });
});

const getAllReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReview();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Review are retrieved successfully",
    data: { result },
  });
});

export const ReviewController = {
  CreateReview,
  getAllReview,
};

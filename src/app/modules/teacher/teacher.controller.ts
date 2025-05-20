import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { TeacherServices } from "./teacher.service";

const CreateTeacher = catchAsync(async (req: Request, res: Response) => {
  const result = await TeacherServices.CreateTeacher(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Teacher Created successfully!",
    data: {
      result,
    },
  });
});

const getAllTeacher = catchAsync(async (req, res) => {
  const result = await TeacherServices.getAllTeacher();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Teacher are retrieved successfully",
    data: { result },
  });
});

const getSingleTeacher = catchAsync(async (req, res) => {
  const { teacherId } = req.params;
  const result = await TeacherServices.getSingleTeacher(teacherId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Single teacher retrieved successfully",
    data: result,
  });
});

export const TeacherController = {
  CreateTeacher,
  getAllTeacher,
  getSingleTeacher,
};

import mongoose from "mongoose";
import { TTeacher } from "./teacher.interface";
import Teacher from "./teacher.model";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";

// Function to create a Teacher
const CreateTeacher = async (userData: TTeacher) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Create the Teacher document
    const Teachers = new Teacher(userData);
    const createdTeacher = await Teachers.save({ session });

    await session.commitTransaction();
    return createdTeacher;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllTeacher = async () => {
  const result = await Teacher.find();
  return result;
};
const getSingleTeacher = async (productId: string) => {
  const teacher = await Teacher.findById(productId);

  if (!teacher) {
    throw new AppError(StatusCodes.NOT_FOUND, "Teacher not found");
  }
  return teacher;
};
export const TeacherServices = {
  CreateTeacher,
  getAllTeacher,
  getSingleTeacher,
};

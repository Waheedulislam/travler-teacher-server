import mongoose, { Schema } from "mongoose";
import { TTeacher } from "./teacher.interface";

// Create the Category schema based on the interface
const TeacherSchema = new Schema<TTeacher>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    countryImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model<TTeacher>("Teacher", TeacherSchema);
export default Teacher;

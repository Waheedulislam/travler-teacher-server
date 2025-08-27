import mongoose, { Schema } from "mongoose";
import { IUser, UserModel, UserRole } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";

// Create the User schema based on the interface
const userSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    image: { type: String, default: null },
    age: { type: String, default: null },
    homeCountry: { type: String, default: null },
    languages: { type: [String], default: [] },
    travelInterests: { type: [String], default: [] },
    targetLanguages: { type: [String], default: [] },
    languageLevel: { type: String, default: null },
    learningGoals: { type: [String], default: [] },
    preferredDestinations: { type: [String], default: [] },
    travelStyle: { type: String, default: null },
    accommodationPreference: { type: String, default: null },
    hobbies: { type: [String], default: [] },
    foodPreferences: { type: [String], default: [] },
    socialStyle: { type: [Number], default: [] },
    adventurousness: { type: [Number], default: [] },

    role: {
      type: String,
      enum: [UserRole.ADMIN, UserRole.USER, UserRole.Teacher],
      default: UserRole.USER,
    },
    lastLogin: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    otpToken: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving, only if modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// Hide password after save
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// Remove password from JSON responses
userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

// Compare plain text password with hashed password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Check if user exists by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select("+password");
};

// Check if user exists by ID and is active
userSchema.statics.checkUserExist = async function (userId: string) {
  const existingUser = await this.findById(userId);
  if (!existingUser)
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, "User does not exist!");
  if (!existingUser.isActive)
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, "User is not active!");
  return existingUser;
};

const User = mongoose.model<IUser, UserModel>("Users", userSchema);
export default User;

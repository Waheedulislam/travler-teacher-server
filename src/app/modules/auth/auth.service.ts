import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import User from "../user/user.model";
import { IAuth, IJwtPayload } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import mongoose from "mongoose";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: IAuth) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await User.findOne({ email: payload.email }).session(session);
    if (!user)
      throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!");
    if (!user.isActive)
      throw new AppError(StatusCodes.FORBIDDEN, "This user is not active!");
    if (!(await User.isPasswordMatched(payload.password, user.password))) {
      throw new AppError(StatusCodes.FORBIDDEN, "Password does not match");
    }

    const jwtPayload: IJwtPayload = {
      userId: user._id as string,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      otpToken: user.otpToken,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      age: user.age,
      homeCountry: user.homeCountry,
      languages: user.languages || [],
      travelInterests: user.travelInterests || [],
      targetLanguages: user.targetLanguages || [],
      languageLevel: user.languageLevel,
      learningGoals: user.learningGoals || [],
      preferredDestinations: user.preferredDestinations || [],
      travelStyle: user.travelStyle,
      accommodationPreference: user.accommodationPreference,
      hobbies: user.hobbies || [],
      foodPreferences: user.foodPreferences || [],
      socialStyle: user.socialStyle || [],
      adventurousness: user.adventurousness || [],
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string
    );
    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string
    );

    await session.commitTransaction();

    return { accessToken, refreshToken };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const refreshToken = async (token: string) => {
  let verifiedToken: any = null;
  try {
    verifiedToken = verifyToken(token, config.jwt_refresh_secret as Secret);
  } catch (err) {
    throw new AppError(StatusCodes.FORBIDDEN, "Invalid Refresh Token");
  }

  const { userId } = verifiedToken;
  const user = await User.findById(userId);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, "User does not exist");
  if (!user.isActive)
    throw new AppError(StatusCodes.BAD_REQUEST, "User is not active");

  const jwtPayload: IJwtPayload = {
    userId: user._id as string,
    name: user.name,
    email: user.email,
    image: user.image || null,
    role: user.role,
    isActive: user.isActive,
    lastLogin: user.lastLogin,
    otpToken: user.otpToken || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    age: user.age,
    homeCountry: user.homeCountry,
    languages: user.languages || [],
    travelInterests: user.travelInterests || [],
    targetLanguages: user.targetLanguages || [],
    languageLevel: user.languageLevel,
    learningGoals: user.learningGoals || [],
    preferredDestinations: user.preferredDestinations || [],
    travelStyle: user.travelStyle,
    accommodationPreference: user.accommodationPreference,
    hobbies: user.hobbies || [],
    foodPreferences: user.foodPreferences || [],
    socialStyle: user.socialStyle || [],
    adventurousness: user.adventurousness || [],
  };

  const newAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string
  );
  return { accessToken: newAccessToken };
};

export const AuthService = {
  loginUser,
  refreshToken,
};

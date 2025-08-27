import { Document, Model } from "mongoose";

// Enum for User Roles
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  Teacher = "teacher",
}

// User Schema Definition
export interface IUser extends Document {
  userId: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  image?: string;
  lastLogin: Date;
  isActive: boolean;
  otpToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
  age?: string;
  homeCountry?: string;
  languages?: string[];
  travelInterests?: string[];
  targetLanguages?: string[];
  languageLevel?: string;
  learningGoals?: string[];
  preferredDestinations?: string[];
  travelStyle?: string;
  accommodationPreference?: string;
  hobbies?: string[];
  foodPreferences?: string[];
  socialStyle?: number[];
  adventurousness?: number[];
}

export interface UserModel extends Model<IUser> {
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isUserExistsByEmail(id: string): Promise<IUser>;
  checkUserExist(userId: string): Promise<IUser>;
}

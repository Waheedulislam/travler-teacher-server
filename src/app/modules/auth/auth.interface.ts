import { UserRole } from "../user/user.interface";

export interface IAuth {
  email: string;
  password: string;
}

export interface IJwtPayload {
  userId: string;
  name: string;
  email: string;
  image?: string | null;
  role: UserRole;
  isActive: boolean;
}

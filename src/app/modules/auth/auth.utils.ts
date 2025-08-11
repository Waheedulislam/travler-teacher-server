import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { IJwtPayload } from "./auth.interface";

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: Secret,
  expiresIn: string
) => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };
  return jwt.sign(jwtPayload, secret, options);
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

import jwt from "jsonwebtoken";
import { JwtPayLoad } from "../types";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// generar token
export const generateToken = (payload: JwtPayLoad): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
};

// verificar token
export const verifyToken = (token: string): JwtPayLoad => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded as JwtPayLoad;
};

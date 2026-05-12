// importar ROLE de prisma
import { Role } from "../generated/prisma";

// importar Request de express
import { Request } from "express";

// realizar las interfaces

// hacer que typescript entienda el request que le llega de req.user
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: Role;
    nombre: string;
  };
}
// informacion que irá al token
export interface JwtPayLoad {
  userId: string;
  email: string;
  role: Role;
}

// mandar una Respuesta de la api
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

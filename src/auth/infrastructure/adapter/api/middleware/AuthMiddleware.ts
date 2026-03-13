import { Request, Response, NextFunction } from "express";
import JwtProvider from "../../../../../shared/infrastructure/security/JwtConfig";

const jwtProvider = new JwtProvider();

export interface AuthRequest extends Request {
  userId?: string;
  role?: string;
}

export default function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token malformado" });
    }

    const payload = jwtProvider.verifyToken(token) as any;

    req.userId = payload.id;
    req.role = payload.role;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

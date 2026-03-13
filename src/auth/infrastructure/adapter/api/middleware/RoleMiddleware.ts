import { Request, Response, NextFunction } from "express";
import JwtProvider from "../../../../../shared/infrastructure/security/JwtConfig";

export default class RoleMiddleware {
  constructor(private readonly jwtProvider: JwtProvider) {}

  checkRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
          return res.status(401).json({ error: "Token no proporcionado" });
        }

        const token = authHeader.split(" ")[1];
        const payload = this.jwtProvider.verifyToken(token) as { role?: string };

        if (!payload?.role || !allowedRoles.includes(payload.role)) {
          return res.status(403).json({ error: "Acceso denegado" });
        }

        (req as any).userRole = payload.role;

        next();
      } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado" });
      }
    };
  };
}

import { JwtPayload } from "jsonwebtoken";

export default interface JWTRepositoryPort {
  generateToken(payload: Record<string, any>): string;
  verifyToken(token: string): JwtPayload | string;
}


import JwtConfig from "../../../shared/infrastructure/security/JwtConfig";
import JwtRepositoryPort from "../../domain/port/driven/adapter/repository/JWTRepositoryPort";

export default class JwtRepository implements JwtRepositoryPort {
  constructor(private readonly jwtConfig: JwtConfig) {}

  generateToken(payload: Record<string, any>): string {
    return this.jwtConfig.generateToken(payload);
  }

  verifyToken(token: string) {
    return this.jwtConfig.verifyToken(token);
  }
}

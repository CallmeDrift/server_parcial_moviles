import jwt, { JwtPayload } from "jsonwebtoken";
import JwtProvider from "./JwtProvider";

export default class JwtConfig {
  private static instance: JwtConfig
  private readonly provider: JwtProvider;

  constructor() {
    this.provider = new JwtProvider();
  }

  static readonly getInstance = (): JwtConfig => {
    JwtConfig.instance = this.instance ?? new JwtConfig()
    return JwtConfig.instance
  }

  generateToken(payload: Record<string, any>): string {
    return jwt.sign(payload, this.provider.secret, {
      expiresIn: this.provider.expiresIn,
    });
  }

  verifyToken(token: string): JwtPayload | string {
    return jwt.verify(token, this.provider.secret) as JwtPayload;
  }
}

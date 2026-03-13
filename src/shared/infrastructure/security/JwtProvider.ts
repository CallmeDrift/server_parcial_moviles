import jwt, { SignOptions } from "jsonwebtoken";
import env_json from "../../../../env/.env.json";
import JwtConfigInterface from "../../domain/interfaces/JwtProviderInterface";

export default class JwtProvider {
  readonly secret: string;
  readonly expiresIn: SignOptions["expiresIn"];

  constructor() {
    const config = env_json as JwtConfigInterface;

    this.secret = config.JWT_SECRET;
    this.expiresIn = config.EXPIRES_IN as SignOptions["expiresIn"];
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });
  }

  verifyToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, this.secret);
  }
}

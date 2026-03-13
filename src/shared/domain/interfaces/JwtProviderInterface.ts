import type { SignOptions } from "jsonwebtoken";

export default interface JwtConfigInterface {
  JWT_SECRET: string;
  EXPIRES_IN: SignOptions["expiresIn"];
}

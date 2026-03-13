import { EnvInterface } from "../../../../domain/interfaces/EnvInterface";
import env_json from "../../../../../../env/.env.json";

export default class ServerProvider {
  private readonly env: EnvInterface;

  constructor() {
    this.env = env_json as EnvInterface;

    if (!this.env) {
      this.env = {
        HOST: "localhost",
        PORT: 3000,
        STATIC_DIR: "public",
        NODE_ENV: "development",
      };
    }
  }

  HOST = (): string => this.env.HOST;
  PORT = (): number => this.env.PORT;
  STATIC_DIR = (): string => this.env.STATIC_DIR;
  NODE_ENV = (): string => this.env.NODE_ENV;
}

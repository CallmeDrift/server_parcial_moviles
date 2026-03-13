import env_json from "../../../../../env/.dbc.json";
import EnvJsonInterface from "../../../domain/interfaces/EnvJsonInterface";

export default class JsonUserProvider {
  private readonly env: EnvJsonInterface;

  constructor() {
    this.env = env_json as EnvJsonInterface;

    if (!this.env || !this.env.JSON_USER || !this.env.JSON_USER.PATH) {
      throw new Error("Invalid JSON_USER configuration in .dbc.json");
    }
  }

  readonly PATH = (): string => this.env.JSON_USER.PATH;
}

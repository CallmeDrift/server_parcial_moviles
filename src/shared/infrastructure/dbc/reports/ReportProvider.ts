import env_json from "../../../../../env/.dbc.json";
import EnvJsonInterface from "../../../domain/interfaces/EnvJsonInterface";

export default class JsonReportProvider {
  private readonly env: EnvJsonInterface

  constructor() {
    this.env = env_json as EnvJsonInterface

    if (!this.env || !this.env.JSON_REPORT) {
      throw new Error('Invalid JSON_REPORT configuration')
    }
  }

  readonly PATH = () => this.env.JSON_REPORT.PATH
}

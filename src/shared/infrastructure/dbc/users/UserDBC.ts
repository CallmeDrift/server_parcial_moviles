import JsonUserProvider from "./UserProvider";
import { promises as fs } from "fs";

export default class JsonUserDBC {
  private static instance: JsonUserDBC;
  private readonly provider: JsonUserProvider;

  private constructor() {
    this.provider = new JsonUserProvider();
  }

  static readonly getInstance = (): JsonUserDBC => {
    JsonUserDBC.instance = this.instance ?? new JsonUserDBC();
    return JsonUserDBC.instance;
  };

  private readonly readJson = async <T>(): Promise<T> => {
    const path = this.provider.PATH();
    const fileContent = await fs.readFile(path, "utf-8");
    return JSON.parse(fileContent) as T;
  };

  readonly getAllUsers = async () => {
    return await this.readJson<any[]>();
  };

  readonly findUserById = async (id: string) => {
    const users = await this.getAllUsers();
    return users.find((u) => u.id === id) ?? null;
  };

  readonly findUserByEmail = async (email: string) => {
    const users = await this.getAllUsers();
    return users.find((u) => u.email === email) ?? null;
  };
}

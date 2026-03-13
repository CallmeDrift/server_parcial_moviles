import Role from "./Role";
import User, { UserInterface } from "./User";

export default class NullUser extends User {
  constructor() {
    const nullUserData: UserInterface = {
      id: "0",
      names: "Unknown",
      surnames: "Unknown",
      role: Role.Unknown,
      email: "Unknown",
      passwordHash: "Unknown",
      createdAt: "Unknown",
    };

    super(nullUserData);
    this.isNull = true;
  }

  override setNames = (_names: string): void => {
    throw new Error("Cannot set names on NullUser");
  };

  override setSurnames = (_surnames: string): void => {
    throw new Error("Cannot set surnames on NullUser");
  };

  override setRole = (_role: Role): void => {
    throw new Error("Cannot set role on NullUser");
  };

  override setEmail = (_email: string): void => {
    throw new Error("Cannot set email on NullUser");
  };
}

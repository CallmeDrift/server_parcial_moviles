import Person, { PersonInterface } from "../../../../shared/domain/abstracts/Person";
import Role from "./Role";

export default class User extends Person {
  private id: string;
  private role: string;
  override isNull: boolean;
  private email: string;
  private passwordHash: string;
  private createdAt: string;

  constructor(user: UserInterface) {
    super(user);
    this.id = user.id;
    this.role = user.role;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
    this.isNull = false;
  }

  getRole(): string {
    return this.role;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }

  getCreatedAt(): string {
    return this.createdAt;
  }

  setRole(role: Role): void {
    this.role = role;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPasswordHash(passwordHash: string): void {
    this.passwordHash = passwordHash;
  }

  setCreatedAt(createdAt: string): void {
    this.createdAt = createdAt;
  }
}

export interface UserInterface extends PersonInterface {
  id: string;
  role: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

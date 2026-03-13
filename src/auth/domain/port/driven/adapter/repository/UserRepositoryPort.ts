import User from "../../../../model/user/User";
import NullUser from "../../../../model/user/NullUser";

export default interface UserRepositoryPort {
  findByEmail(email: string): Promise<User | NullUser>;
  findById(id: string): Promise<User>
}

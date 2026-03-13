import NullUser from "../model/user/NullUser";
import User from "../model/user/User";

export default interface AuthServiceInterface {
   findByEmail(email: string): Promise<User | NullUser>;
   findById(id: string): Promise<User>
}
import UserRepositoryPort from "../../domain/port/driven/adapter/repository/UserRepositoryPort";
import User from "../../domain/model/user/User";
import NullUser from "../../domain/model/user/NullUser";
import AuthServiceInterface from "../../domain/interfaces/AuthServiceInterface";
import JwtRepositoryPort from "../../domain/port/driven/adapter/repository/JWTRepositoryPort";

export default class AuthService implements AuthServiceInterface {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly jwtRepository: JwtRepositoryPort
  ) {}

  findByEmail(email: string): Promise<User | NullUser>{
     return this.userRepository.findByEmail(email)
  }

  findById(id: string): Promise<User>{
     return this.userRepository.findById(id)
  }
}
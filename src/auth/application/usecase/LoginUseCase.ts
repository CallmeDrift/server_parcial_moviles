import bcrypt from "bcrypt";
import User from "../../domain/model/user/User";
import LoginUseCasePort from "../../domain/port/driver/usecase/LoginUseCasePort";
import AuthServiceInterface from "../../domain/interfaces/AuthServiceInterface";
import NullUser from "../../domain/model/user/NullUser";
import JWTRepositoryPort from "../../domain/port/driven/adapter/repository/JWTRepositoryPort";

export default class LoginUseCase implements LoginUseCasePort {
  constructor(
    private readonly userService: AuthServiceInterface,
    private readonly jwtRepository: JWTRepositoryPort
  ) {}

  async login(email: string, password: string): Promise<string | null> {
    const user: User | NullUser = await this.userService.findByEmail(email);

    if (user instanceof NullUser) return null;

    const isPasswordValid = await bcrypt.compare(password, user.getPasswordHash());
    if (!isPasswordValid) return null;

    const payload = {
      id: user.getId(),
      email: user.getEmail(),
      role: user.getRole(),
      nombre: user.getNames(),
      apellido: user.getSurname()
    };

    const token = this.jwtRepository.generateToken(payload);

    return token;
  }
}

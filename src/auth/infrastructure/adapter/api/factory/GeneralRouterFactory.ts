import AbstractGeneralRouter from "../../../../domain/api/AbstractGeneralRouter";
import AuthController from "../controller/AuthController";
import AuthRouter from "../router/GeneralRouter";
import SQLiteUserRepository from "../../../repository/SQLiteUserRepository";
import JwtConfig from "../../../../../shared/infrastructure/security/JwtConfig";
import LoginUseCase from "../../../../application/usecase/LoginUseCase";
import AuthService from "../../../../application/service/AuthService";
import JwtRepository from "../../../repository/JWTRepository";

export default class GeneralRouterFactory {

  static readonly create = (): AbstractGeneralRouter => {

    const userRepository = new SQLiteUserRepository();

    const jwtConfig = JwtConfig.getInstance();
    const jwtRepository = new JwtRepository(jwtConfig);

    const userService = new AuthService(userRepository, jwtRepository);
    const loginUseCase = new LoginUseCase(userService, jwtRepository);
    const authController = new AuthController(loginUseCase);

    const authRouter = new AuthRouter(authController);

    return authRouter;
  };

}
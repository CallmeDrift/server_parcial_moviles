import ServerFactory from "./api/infrastructure/adapter/api/factory/ServerFactory";
import GeneralRouterFactory from "./auth/infrastructure/adapter/api/factory/GeneralRouterFactory";

const authRouter = GeneralRouterFactory.create();

const server = ServerFactory.create([authRouter]);

server.start();
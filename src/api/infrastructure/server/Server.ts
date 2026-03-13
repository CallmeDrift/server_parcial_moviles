import { Application } from "express";
import ServerProvider from "../adapter/api/provider/ServerProvider";
import AbstractRouter from "../../domain/abstracts/AbstractRouter";
import express from "express";
import path from "path";
import cors from "cors";

export default class Server {
  private readonly app: Application;

  constructor(
    private readonly env: ServerProvider,
    private readonly routers: AbstractRouter[],
  ) {
    this.app = express();
    this.configure();
    this.static();
    this.routes();
  }

  readonly routes = (): void => {
    this.routers.forEach((router) => {
      router.attach(this.app);
    });
  };

  readonly configure = (): void => {
    this.app.use(
      cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      }),
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  };

  readonly static = (): void => {
    this.app.use(express.static(path.join(__dirname, this.env.STATIC_DIR())));
  };

  readonly start = (): void => {
    const port = this.env.PORT();
    this.app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  };
}

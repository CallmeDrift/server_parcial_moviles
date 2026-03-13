import AbstractRouter from "../../../../domain/abstracts/AbstractRouter";
import ErrorController from "../controller/ErrorController";
import ErrorRouter from "../router/ErrorRouter";

export default class ErrorRouterFactory {
  static readonly create = (): AbstractRouter => {
    try {
      const controller = new ErrorController();
      if (!controller) {
        throw new Error("Failed to create ErrorControler");
      }
      const errorRouter = new ErrorRouter(controller);
      if (!errorRouter) {
        throw new Error("Failed to create ErrorRouter");
      }
      return errorRouter;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
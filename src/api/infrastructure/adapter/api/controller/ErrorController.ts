import AbstractController from "../../../../domain/abstracts/AbstractController"
import { Response, Request } from "express"

export default class ErrorController extends AbstractController{
    readonly notFound = (_req: Request, res: Response) => {
        res
             .status(this.HTTPStatusCode.NOT_FOUND)
             .json({error: 'Resource Not Found!'})
    }

}
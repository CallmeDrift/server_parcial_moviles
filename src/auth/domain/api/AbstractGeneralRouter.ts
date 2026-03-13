import { AbstractRouter } from "../../../api/API";

export default abstract class AbstractGeneralRouter extends AbstractRouter{
    protected abstract routes(): void
}
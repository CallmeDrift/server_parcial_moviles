import { AbstractRouter } from "../../../../API"
import Server from "../../../server/Server"
import ErrorRouterFactory from "./ErrorRouterFactory"
import ServerProviderFactory from "./SeverProviderFactory"

export default class ServerFactory {
    static readonly create = (routers: AbstractRouter[]): Server => {
        try{
             const errorRouter = ErrorRouterFactory.create()

             const serverProvider = ServerProviderFactory.create()

             const server = new Server(serverProvider, [...routers, errorRouter])

             if(!server){
                throw new Error("Server not found")
             }

             return server
        }catch(error){
            console.log(error)
            throw error
        }
    }
}
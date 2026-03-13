import ServerProvider from "../provider/ServerProvider";

export default class ServerProviderFactory{
    static readonly create = (): ServerProvider => {
        const serverProvider = new ServerProvider()
        if(!serverProvider){
            throw new Error('Failed to create serverControler')
        }

        return serverProvider
    }
}
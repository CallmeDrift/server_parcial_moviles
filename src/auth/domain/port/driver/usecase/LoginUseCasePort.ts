export default interface LoginUseCasePort {

  login(username: string, password: string): Promise<string | null>;
}

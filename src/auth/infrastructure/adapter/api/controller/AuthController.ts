import { Request, Response } from "express";
import LoginUseCasePort from "../../../../domain/port/driver/usecase/LoginUseCasePort";
import AbstractAuthController from "../../../../domain/api/AbstractAuthController";

export default class AuthController extends AbstractAuthController {
  constructor(private readonly authUseCase: LoginUseCasePort) {
    super()
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      console.log("BODY RECIBIDO:", req.body);
      const { email, contrasena } = req.body;

      if (!email || !contrasena) {
        res.status(400).json({ error: "Email y contraseña son obligatorios" });
        return;
      }

      const token = await this.authUseCase.login(email, contrasena);

      if (!token) {
        res.status(401).json({ error: "Credenciales inválidas" });
        return;
      }

      res.status(200).json({ token });
    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

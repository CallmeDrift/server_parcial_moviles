import AbstractGeneralRouter from "../../../../domain/api/AbstractGeneralRouter";
import AuthController from "../controller/AuthController";
import authMiddleware from "../middleware/AuthMiddleware";
import JwtProvider from "../../../../../shared/infrastructure/security/JwtProvider";
import db from "../../../../../shared/infrastructure/dbc/Database";

export default class GeneralRouter extends AbstractGeneralRouter {

  constructor(
    private readonly authController: AuthController,
  ) {
    super("");

    this.routes();
  }

  protected override routes(): void {

    this.router.post("/login", (req, res) =>
      this.authController.login(req, res)
    );

    this.router.get(
      "/profile",
      authMiddleware,
      (req: any, res) => {
        res.status(200).json({
          message: "Ruta protegida",
          userId: req.userId,
          role: req.role
        });
      }
    );

    this.router.get(
      "/articulos",
      authMiddleware,
      (req, res) => {
        db.all("SELECT * FROM articulos", [], (err, rows) => {
          if (err) {
            return res.status(500).json({ error: "Error BD" });
          }
          res.json(rows);
        });
      }
    );

    this.router.post(
      "/favoritos",
      authMiddleware,
      (req: any, res) => {
        const { articulo_id } = req.body;
        db.run(
          `INSERT INTO favoritos (user_id, articulo_id)
       VALUES (?, ?)`,
          [req.userId, articulo_id],
          function (err) {
            if (err) {
              return res.status(500).json({ error: "Error BD" });
            }

            console.log("Favorito agregado:", articulo_id);
            res.status(201).json({
              message: "Favorito guardado"
            });
          }
        );
      }
    );

    this.router.get(
      "/favoritos",
      authMiddleware,
      (req: any, res) => {
        db.all(
          `
      SELECT articulos.*
      FROM favoritos
      JOIN articulos
      ON favoritos.articulo_id = articulos.id
      WHERE favoritos.user_id = ?
      `,
          [req.userId],
          (err, rows) => {
            if (err) {
              return res.status(500).json({ error: "Error BD" });
            }
            console.log("Favoritos del usuario:", rows);
            res.json(rows);
          }
        );
      }
    );

    this.router.delete(
      "/favoritos/:articuloId",
      authMiddleware,
      (req: any, res) => {

        const articuloId = req.params.articuloId;
        const userId = req.userId;

        db.run(
          "DELETE FROM favoritos WHERE user_id = ? AND articulo_id = ?",
          [userId, articuloId],
          function (err) {

            if (err) {
              return res.status(500).json({ error: "Error eliminando favorito" });
            }

            console.log("Favorito eliminado:", articuloId);

            res.json({ message: "Favorito eliminado" });

          }
        );
      }
    );

  }
}

import db from "../../../shared/infrastructure/dbc/Database";
import User from "../../domain/model/user/User";
import NullUser from "../../domain/model/user/NullUser";
import UserRepositoryPort from "../../domain/port/driven/adapter/repository/UserRepositoryPort";

export default class SQLiteUserRepository implements UserRepositoryPort {

  findByEmail(email: string): Promise<User | NullUser> {
    return new Promise((resolve, reject) => {

      db.get(
        "SELECT * FROM usuarios WHERE email = ?",
        [email],
        (err, row: any) => {

          if (err) return reject(err);

          if (!row) {
            return resolve(new NullUser());
          }

          resolve(
            new User({
              id: row.id,
              names: row.names,
              surnames: row.surnames,
              role: row.role,
              email: row.email,
              passwordHash: row.passwordHash,
              createdAt: row.createdAt
            })
          );

        }
      );

    });
  }

  findById(id: string): Promise<User | NullUser> {
    return new Promise((resolve, reject) => {

      db.get(
        "SELECT * FROM usuarios WHERE id = ?",
        [id],
        (err, row: any) => {

          if (err) return reject(err);

          if (!row) {
            return resolve(new NullUser());
          }

          resolve(
            new User({
              id: row.id,
              names: row.names,
              surnames: row.surnames,
              role: row.role,
              email: row.email,
              passwordHash: row.passwordHash,
              createdAt: row.createdAt
            })
          );

        }
      );

    });
  }

}
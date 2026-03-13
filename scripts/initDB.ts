import db from "../src/shared/infrastructure/dbc/Database";

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      names TEXT,
      surnames TEXT,
      email TEXT UNIQUE,
      passwordHash TEXT,
      role TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS articulos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      vendedor TEXT,
      calificacion REAL,
      imagen TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS favoritos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      articulo_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES usuarios(id),
      FOREIGN KEY(articulo_id) REFERENCES articulos(id)
    )
  `);

});

console.log("Base de datos creada");
import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "../../../../database/database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error conectando a SQLite:", err);
  } else {
    console.log("Conectado a SQLite");
  }
});

export default db;
    import db from "../src/shared/infrastructure/dbc/Database";
    import bcrypt from "bcrypt";

    async function seed() {

    const passwordHash = await bcrypt.hash("123456", 10);

    db.run(`
        INSERT INTO usuarios (names, surnames, email, passwordHash, role)
        VALUES (?, ?, ?, ?, ?)
    `,
    ["Diego", "Suarez", "callmedrift@gmail.com", passwordHash, "admin"]
    );

    }

    seed();
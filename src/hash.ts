import bcrypt from "bcrypt";

async function generate() {
  const hash = await bcrypt.hash("1234", 10);
  console.log("HASH:", hash);
}

generate();

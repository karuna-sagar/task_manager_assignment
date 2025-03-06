import { Connection } from "mysql2/promise";
import bcrypt from "bcrypt";

export async function createUser(
  db: Connection,
  username: string,
  email: string,
  password: string
) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const [result] = await db.execute(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword]
  );
  return (result as any).insertId;
}

export async function findUserByEmail(db: Connection, email: string) {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return (rows as any)[0];
}

export async function userExists(
  db: Connection,
  email: string,
  username: string
) {
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE email = ? OR username = ?",
    [email, username]
  );
  return (rows as any).length > 0;
}

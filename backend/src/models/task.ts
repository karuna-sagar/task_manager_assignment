import { Connection } from "mysql2/promise";

export async function createTask(
  db: Connection,
  title: string,
  description: string,
  dueDate: string,
  userId: number
) {
  const [result] = await db.execute(
    "INSERT INTO tasks (title, description, due_date, user_id) VALUES (?, ?, ?, ?)",
    [title, description, dueDate, userId]
  );
  return (result as any).insertId;
}

export async function getTasksByUserId(db: Connection, userId: number) {
  const [rows] = await db.execute("SELECT * FROM tasks WHERE user_id = ?", [
    userId,
  ]);
  return rows as any[];
}

export async function updateTask(
  db: Connection,
  id: number,
  title: string,
  description: string,
  dueDate: string,
  completed: boolean,
  userId: number
) {
  const [result] = await db.execute(
    "UPDATE tasks SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ? AND user_id = ?",
    [title, description, dueDate, completed, id, userId]
  );
  return (result as any).affectedRows > 0;
}

export async function deleteTask(db: Connection, id: number, userId: number) {
  const [result] = await db.execute(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [id, userId]
  );
  return (result as any).affectedRows > 0;
}

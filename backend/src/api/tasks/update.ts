import { Request, Response, RequestHandler } from "express";
import { connection } from "../../config/db";
import { updateTask } from "../../models/task";

export const update: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body; // No strict validation
  const userId = (req as any).user.id;

  try {
    const db = connection;
    const [currentTask] = (await db.execute(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
      [id, userId]
    )) as any[];
    if (!currentTask.length) {
      res
        .status(404)
        .json({ success: false, message: "Task not found or unauthorized" });
      return;
    }

    const updatedTask = {
      title: title !== undefined ? title : currentTask[0].title,
      description:
        description !== undefined ? description : currentTask[0].description,
      dueDate: dueDate !== undefined ? dueDate : currentTask[0].due_date,
      completed: completed !== undefined ? completed : currentTask[0].completed,
    };

    const success = await updateTask(
      db,
      parseInt(id),
      updatedTask.title,
      updatedTask.description,
      updatedTask.dueDate,
      updatedTask.completed,
      userId
    );
    if (success) {
      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        task: { id: parseInt(id), ...updatedTask, userId },
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Task not found or unauthorized" });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

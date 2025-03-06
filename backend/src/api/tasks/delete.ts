import { Request, Response, RequestHandler } from "express";
import { connection } from "../../config/db";
import { deleteTask } from "../../models/task";

export const deleteTaskHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const userId = (req as any).user.id; // From JWT middleware

  try {
    const db = connection;
    const success = await deleteTask(db, parseInt(id), userId);
    if (success) {
      res
        .status(200)
        .json({ success: true, message: "Task deleted successfully" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Task not found or unauthorized" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

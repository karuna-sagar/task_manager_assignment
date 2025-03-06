import { Request, Response, RequestHandler } from "express";
import { connection } from "../../config/db";
import { createTask } from "../../models/task";

export const create: RequestHandler = async (req: Request, res: Response) => {
  const { title, description, dueDate } = req.body;
  const userId = (req as any).user.id; // From JWT middleware

  if (!title || !description || !dueDate) {
    res.status(400).json({
      success: false,
      message: "Title, description, and due date are required",
    });
    return;
  }

  try {
    const db = connection;
    const taskId = await createTask(db, title, description, dueDate, userId);
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: {
        id: taskId,
        title,
        description,
        dueDate,
        completed: false,
        userId,
      },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

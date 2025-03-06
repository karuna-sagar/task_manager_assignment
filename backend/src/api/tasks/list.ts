import { Request, Response, RequestHandler } from "express";
import { connection } from "../../config/db";
import { getTasksByUserId } from "../../models/task";

export const list: RequestHandler = async (req: Request, res: Response) => {
  const userId = (req as any).user.id; // From JWT middleware

  try {
    const db = connection;
    const tasks = await getTasksByUserId(db, userId);
    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

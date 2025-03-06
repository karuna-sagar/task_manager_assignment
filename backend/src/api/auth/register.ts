import { Request, Response, RequestHandler } from "express";
import { connection } from "../../config/db";
import { createUser, userExists } from "../../models/user";

export const register: RequestHandler = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required" });
    return; // Use return to exit early
  }

  try {
    const db = connection;
    if (await userExists(db, email, username)) {
      res.status(400).json({ success: false, message: "User already exists" });
      return; // Early return
    }

    const userId = await createUser(db, username, email, password);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { id: userId, username, email },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

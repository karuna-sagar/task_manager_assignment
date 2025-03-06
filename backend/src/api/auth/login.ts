import { Request, Response, RequestHandler } from "express";
import { connection } from "../../config/db";
import { findUserByEmail } from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
    return; // Early return
  }

  try {
    const db = connection;
    const user = await findUserByEmail(db, email);

    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return; // Early return
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return; // Early return
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

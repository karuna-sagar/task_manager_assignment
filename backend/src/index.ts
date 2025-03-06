import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import { connectDB } from "./config/db";
import { register } from "./api/auth/register";
import { login } from "./api/auth/login";
import { authenticateToken } from "./middleware/auth";
import { create } from "./api/tasks/create";
import { list } from "./api/tasks/list";
import { update } from "./api/tasks/update";
import { deleteTaskHandler } from "./api/tasks/delete";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Updated to match your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

// Protected Task Routes
app.post("/api/tasks", authenticateToken, create);
app.get("/api/tasks", authenticateToken, list);
app.put("/api/tasks/:id", authenticateToken, update);
app.delete("/api/tasks/:id", authenticateToken, deleteTaskHandler);

async function startServer() {
  try {
    const db = await connectDB();
    (app as any).db = db; // Attach db connection to app

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();

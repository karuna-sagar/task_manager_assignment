import React, { useState, useEffect } from "react";
import axios from "axios";
import { Task } from "../data/tasks";
import TaskList from "../components/dashboard/TaskList";
import TaskForm from "../components/dashboard/TaskForm";
import AddTaskButton from "../components/dashboard/AddTaskButton";
import Header from "../common/Header";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });
  const [updateTask, setUpdateTask] = useState<Task | null>(null);
  const [visibleDescription, setVisibleDescription] = useState<number | null>(
    null
  );

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to load tasks");
    }
  };

  useEffect(() => {
    if (updateTask) {
      setFormData({
        title: updateTask.title,
        description: updateTask.description || "",
        dueDate: updateTask.dueDate,
        completed: updateTask.completed,
      });
      setShowForm(true);
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        completed: false,
      });
    }
  }, [updateTask]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, completed: e.target.checked });
  };

  const handleSaveTask = async () => {
    if (formData.title && formData.description && formData.dueDate) {
      try {
        if (updateTask) {
          await axiosInstance.put(`/tasks/${updateTask.id}`, formData);
          setUpdateTask(null);
        } else {
          await axiosInstance.post("/tasks", formData);
        }
        fetchTasks();
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          completed: false,
        });
        setShowForm(false);
      } catch (error) {
        console.error("Error saving task:", error);
        alert("Failed to save task");
      }
    } else {
      alert("Please fill in all fields: Title, Description, and Due Date.");
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "", dueDate: "", completed: false });
    setUpdateTask(null);
    setShowForm(false);
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  const handleCheckAndUncheck = async (id: number) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        const updatedTask = {
          title: task.title, // Ensure required field
          description: task.description || "", // Handle null/undefined
          dueDate: task.dueDate, // Ensure required field
          completed: !task.completed, // Toggle completed
        };
        await axiosInstance.put(`/tasks/${id}`, updatedTask);
        setTasks(tasks.map((t) => (t.id === id ? updatedTask : t))); // Update UI immediately
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status");
      fetchTasks(); // Fallback to refresh tasks if update fails
    }
  };

  const toggleDescription = (id: number) => {
    setVisibleDescription(visibleDescription === id ? null : id);
  };

  return (
    <div>
      <Header /> {/* Header with logout button */}
      <div style={{ width: "50%", margin: "50px auto", textAlign: "center" }}>
        <h1>Task Management</h1>
        <AddTaskButton onClick={() => setShowForm(true)} />
        {showForm && (
          <TaskForm
            formData={formData}
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
            onSave={handleSaveTask}
            onCancel={handleCancel}
            isEditing={!!updateTask}
          />
        )}
        <TaskList
          tasks={tasks}
          onToggleComplete={handleCheckAndUncheck}
          onEdit={setUpdateTask}
          onDelete={handleDeleteTask}
          visibleDescription={visibleDescription}
          toggleDescription={toggleDescription}
        />
      </div>
    </div>
  );
};

export default Dashboard;

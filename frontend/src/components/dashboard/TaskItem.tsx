import React from "react";
import { FaCheck, FaPencilAlt, FaTrash, FaAngleDown } from "react-icons/fa";
import { Task } from "../../data/tasks";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  isDescriptionVisible: boolean;
  toggleDescription: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  isDescriptionVisible,
  toggleDescription,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        margin: "10px 0",
        backgroundColor: "#f8f9fa",
        borderRadius: "5px",
      }}
    >
      <div style={{ textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              marginRight: "10px",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            {task.title}
          </span>
          {(task.description || task.dueDate) && (
            <FaAngleDown
              onClick={() => toggleDescription(task.id)}
              style={{ cursor: "pointer", fill: "#000" }}
            />
          )}
        </div>
        {isDescriptionVisible && (
          <div style={{ margin: "5px 0 0 0", color: "#555" }}>
            {task.description && <p>Description: {task.description}</p>}
            {task.dueDate && <p>Due Date: {task.dueDate}</p>}
            <p>Status: {task.completed ? "Completed" : "Pending"}</p>
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() => onToggleComplete(task.id)}
          style={{
            marginRight: "10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            padding: "5px",
          }}
        >
          <FaCheck />
        </button>
        <button
          onClick={() => onEdit(task)}
          style={{
            marginRight: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            padding: "5px",
          }}
        >
          <FaPencilAlt />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "5px",
          }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

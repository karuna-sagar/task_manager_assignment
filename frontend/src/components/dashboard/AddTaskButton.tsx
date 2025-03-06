import React from "react";
import { FaPlus } from "react-icons/fa";

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button
        onClick={onClick}
        style={{
          padding: "8px 15px",
          backgroundColor: "green",
          color: "white",
          border: "none",
        }}
      >
        <FaPlus /> Add Task
      </button>
    </div>
  );
};

export default AddTaskButton;

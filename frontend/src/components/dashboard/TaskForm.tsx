import React from "react";

interface TaskFormProps {
  formData: {
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  formData,
  onInputChange,
  onCheckboxChange,
  onSave,
  onCancel,
  isEditing,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        zIndex: 10,
        width: "40%",
        color: "#000",
      }}
    >
      <h3>{isEditing ? "Edit Task" : "Add Task"}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          placeholder="Title"
          style={{ padding: "8px" }}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={onInputChange}
          placeholder="Description"
          style={{ padding: "8px", minHeight: "60px" }}
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={onInputChange}
          style={{ padding: "8px" }}
        />
        <label>
          <input
            type="checkbox"
            checked={formData.completed}
            onChange={onCheckboxChange}
          />
          Completed
        </label>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button
            onClick={onSave}
            style={{
              padding: "8px 15px",
              backgroundColor: "green",
              color: "white",
              border: "none",
            }}
          >
            Save
          </button>
          <button
            onClick={onCancel}
            style={{
              padding: "8px 15px",
              backgroundColor: "gray",
              color: "white",
              border: "none",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;

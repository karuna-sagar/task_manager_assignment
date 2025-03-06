import React from "react";
import { Task } from "../../data/tasks";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  visibleDescription: number | null;
  toggleDescription: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  visibleDescription,
  toggleDescription,
}) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          isDescriptionVisible={visibleDescription === task.id}
          toggleDescription={toggleDescription}
        />
      ))}
    </div>
  );
};

export default TaskList;

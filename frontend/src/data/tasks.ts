export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate: string; // Using string for simplicity (e.g., "2023-12-31")
  userId: number;
}

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Finish project proposal",
    description: "Write and submit the proposal for the client meeting.",
    completed: false,
    dueDate: "2023-12-31",
    userId: 1,
  },
  {
    id: 2,
    title: "Grocery shopping",
    description: "Buy vegetables, milk, and bread.",
    completed: true,
    dueDate: "2023-11-15",
    userId: 1,
  },
  {
    id: 3,
    title: "Call team for update",
    description: undefined,
    completed: false,
    dueDate: "2023-11-20",
    userId: 1,
  },
];

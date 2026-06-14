import TaskCard from "./components/TaskCard/TaskCard";
import type { Task } from "./types/task";


const mockTask: Task = {
  id: "1",
  title: "Тестова задача",
  description: "Перевірка відображення картки",
  status: "todo",
  priority: "high",
  createdAt: new Date(),
};


function App() {
  return (
    <TaskCard
      task={mockTask}
      onDelete={(id) => console.log("delete", id)}
      onStatusChange={(id, status) => console.log("status", id, status)}
    />
  );
}


export default App;

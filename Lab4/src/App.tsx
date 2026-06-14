import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Layout from "./components/Layout/Layout";
// Розкоментуйте кожен імпорт після того, як створите відповідний файл на Етапах 5–7:
// import TasksPage from "./pages/TasksPage/TasksPage";
// import TaskDetailPage from "./pages/TaskDetailPage/TaskDetailPage";
// import NewTaskPage from "./pages/NewTaskPage/NewTaskPage";


// тимчасові
const TasksPage = ({ tasks }: any) => (
  <div></div>
);
const NewTaskPage = ({ onAdd }: any) => (
  <div></div>
);
const TaskDetailPage = ({ tasks }: any) => (
  <div></div>
);


// TODO (Варіант А): імпортуйте useState, INITIAL_TASKS та тип Task
import type { Task, TaskStatus } from "./types/task";
import { INITIAL_TASKS } from "./data/initialTasks";


export default function App() {
    // TODO (Варіант А): оголосіть tasks через useState<Task[]>(INITIAL_TASKS)


    //стан для списку задач
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);


    //метод додавання завдання
    const addTask = (task: Task) => 
    {
        setTasks((prev) => [task, ...prev]);
    };


    //метод видалення завдання
    const deleteTask = (id: string) => 
    {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };


    //метод оновлення завдання
    const updateTask = (updatedTask: Task) => 
    {
        setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    };


    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/tasks" replace />} />
            
            {/* TODO: оголосіть маршрути:
              - <Route path="tasks" element={...} />   — список задач
              - <Route path="tasks/new" element={...} /> — нова задача
              - <Route path="tasks/:id" element={...} /> — деталі задачі


              Варіант А: передайте необхідні props у кожну сторінку:
                <TasksPage tasks={tasks} onDelete={deleteTask} />
                <NewTaskPage onAdd={addTask} />
                <TaskDetailPage tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
            */}


            {/*сторінка списку */}
            <Route 
                path="tasks" 
                element={<TasksPage tasks={tasks} onDelete={deleteTask} />} 
            />
            
            {/*сторінка створення */}
            <Route 
                path="tasks/new" 
                element={<NewTaskPage onAdd={addTask} />} 
            />
            
            {/*сторінка деталізації */}
            <Route 
                path="tasks/:id" 
                element={<TaskDetailPage tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />} 
            />
            
            </Route>
        </Routes>
        </BrowserRouter>
    );
}

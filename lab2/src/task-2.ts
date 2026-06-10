import { VARIANT } from "./config";

type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";

interface Task 
{
    id: number;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    assignee: string | null; // null, якщо задача не призначена
    createdAt: Date;
    dueDate: Date | null;
}

const tasks: Task[] = [
  {
    id: 1 + VARIANT,
    title: "Розробити API",
    description: "Реалізувати REST API для управління задачами",
    status: "in_progress",
    priority: "high",
    assignee: "Іван Петренко",
    createdAt: new Date("2025-01-10"),
    dueDate: new Date("2025-02-01"),
  },
  {
    id: 2 + VARIANT,
    title: "Написати тести",
    description: "Покрити unit-тестами основну логіку",
    status: "todo",
    priority: "medium",
    assignee: null,
    createdAt: new Date("2025-01-12"),
    dueDate: new Date("2025-02-15"),
  },
  {
    id: 3 + VARIANT,
    title: "Налаштувати БД",
    description: "Підключити PostgreSQL, виконати міграції",
    status: "done",
    priority: "critical",
    assignee: "Олена Коваль",
    createdAt: new Date("2025-01-05"),
    dueDate: new Date("2025-01-20"),
  },
  {
    id: 4 + VARIANT,
    title: "Оновити документацію",
    description: "Описати API у Swagger",
    status: "todo",
    priority: "low",
    assignee: null,
    createdAt: new Date("2025-01-15"),
    dueDate: null,
  },
  {
    id: 5 + VARIANT,
    title: "Code review",
    description: "Перевірити pull request від команди",
    status: "cancelled",
    priority: "medium",
    assignee: "Андрій Лисенко",
    createdAt: new Date("2025-01-18"),
    dueDate: new Date("2025-01-25"),
  },
];

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

//метод повернення успішної відповіді
function createSuccessResponse<T>(data: T): ApiResponse<T> 
{
  return { data, status: 1, message: "Success", timestamp: new Date() };
}
//метод повернення провальної відповіді
function createErrorResponse<T>(message: string): ApiResponse<T | null> 
{
  return { data: null, status: 0, message, timestamp: new Date() };
}

type СreateTaskDto = Omit<Task, "id" | "createdAt">; //тип, що прибирає поля ID та createdAt
type UpdateTaskDto = Partial<СreateTaskDto>; //тип, що робить усі поля необов'язковими

const newTask: СreateTaskDto = 
{
  //вилучили поля ID та createdAt
  title: "задача",
  description: "Опис задачі",
  status: "todo",
  priority: "medium",
  assignee: null,
  dueDate: new Date("2012-12-12")
};

const updatedTask: UpdateTaskDto = {
  status: "done" //немає обов'язкових полів і можна передати навіть одне
};

function filterTasks<K extends keyof Task>(tasks: Task[], key: K, value: Task[K]): Task[]
{
  return tasks.filter((task) => task[key] === value);
}

console.log("=== Завдання 2: Generics та Utility Types ===");
console.log("Варіант:", VARIANT);
//фільтрація за статусом
const inProgress = filterTasks(tasks, "status", "in_progress");
console.log("Задачі в роботі:", inProgress);

//фільтрація за пріоритетом
const highPriority = filterTasks(tasks, "priority", "high");
console.log("Високий пріоритет:", highPriority);

//фільтрація за ід
const specificTask = filterTasks(tasks, "id", 3 + VARIANT);
console.log("Задача за ID:", specificTask);
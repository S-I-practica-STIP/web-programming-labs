export {};

const tasks: Task[] = [
  {
    id: 1,
    title: "Розробити API",
    description: "Реалізувати REST API для управління задачами",
    status: "in_progress",
    priority: "high",
    assignee: "Іван Петренко",
    createdAt: new Date("2025-01-10"),
    dueDate: new Date("2025-02-01"),
  },
  {
    id: 2,
    title: "Написати тести",
    description: "Покрити unit-тестами основну логіку",
    status: "todo",
    priority: "medium",
    assignee: null,
    createdAt: new Date("2025-01-12"),
    dueDate: new Date("2025-02-15"),
  },
  {
    id: 3,
    title: "Налаштувати БД",
    description: "Підключити PostgreSQL, виконати міграції",
    status: "done",
    priority: "critical",
    assignee: "Олена Коваль",
    createdAt: new Date("2025-01-05"),
    dueDate: new Date("2025-01-20"),
  },
  {
    id: 4,
    title: "Оновити документацію",
    description: "Описати API у Swagger",
    status: "todo",
    priority: "low",
    assignee: null,
    createdAt: new Date("2025-01-15"),
    dueDate: null,
  },
  {
    id: 5,
    title: "Code review",
    description: "Перевірити pull request від команди",
    status: "cancelled",
    priority: "medium",
    assignee: "Андрій Лисенко",
    createdAt: new Date("2025-01-18"),
    dueDate: new Date("2025-01-25"),
  },
];

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

interface HasId 
{
    id: number;
}

interface Project extends HasId 
{
    name: string;
    description: string;
    tasks: Task[];
    ownerId: number;
}

interface TaskStatus //об'єкт, який буде отримано після аналізу
{
    total: number; 
    byStatus: Record<Status, number>; 
    overdue: number
}

function getTaskStats(tasks: Task[]): TaskStatus //метод для аналізу завдань
{
    let _total: number = 0;
    //оголошуємо змінну для обліку статусів
    let _byStatus: Record<Status, number> = 
    {
        todo: 0,
        in_progress: 0,
        done: 0,
        cancelled: 0
    }; 
    let _overdue: number = 0;

    //цикл, в якому проходимо по усім завданням
    for (let i = 0; i < tasks.length; i++) 
    {    
        let task: Task = tasks[i]; //отримуємо об'єкт завдання
        //проходимо по кожному статусу в змінній обліку статусів
        for(let key of Object.keys(_byStatus) as Status[]) 
        {
            if (key == task.status) //перевіряємо, чи відповідає статус статусу поля завдання
            { _byStatus[key] += 1} //якщо так, то збільшуємо це статус на 1 у змінній _byStatus
        }
        //перевірка, чи просрочене завдання.  
        if(task.dueDate && task.dueDate < new Date && (task.status != "done" && task.status != "cancelled"))
        { _overdue += 1; }

        _total += 1;   
    }

    const taskStatus: TaskStatus = {total: _total, byStatus: _byStatus, overdue: _overdue} 
    return taskStatus; //повертаємо об'єкт
}

//функція форматування завдання
function formatTask(task: Task): String
{
    return "[*" + task.id + "] " + task.description + " (" + task.priority + ", " + task.status + ")";   
}

//виводимо результати:
console.log("=== Завдання 1: Базові типи, інтерфейси та type aliases ===");
for (let task of tasks)
{
    console.log(formatTask(task));
}
console.log("Аналіз:");
console.log(getTaskStats(tasks));


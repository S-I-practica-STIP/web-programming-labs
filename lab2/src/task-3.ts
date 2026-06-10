export {};

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

class TaskManager
{
    #tasks: Task[] = [];
    #nextId: number = 1;

    constructor(initialTasks: Task[] = [])
    {
        initialTasks.forEach(task => this.addTask(task));
    }
    //метод додавання завдання. передаємо завдання і вилучаємо id та createdAt
    addTask(dto: Omit<Task, "id" | "createdAt">): Task 
    {
        //створюємо нове завдання
        const newTask: Task = 
        {
            //копіюємо поля
            title: dto.title,
            description: dto.description,
            status: dto.status,
            priority: dto.priority,
            assignee: dto.assignee,
            dueDate: dto.dueDate,
            //змінюємо поля
            id: this.#nextId++,
            createdAt: new Date()
        };
        //додаємо в масив нове завдання
        this.#tasks.push(newTask);
        return newTask;
    }

    //метод оновлення задачі
    updateTask(id: number, updates: Partial<Omit<Task, "id" | "createdAt">>): Task | null 
    {
        //
        const index = this.#tasks.findIndex(task => task.id === id);
        if (index === -1) return null; 

        //об'єднуємо старі дані задачі з новими оновленнями
        this.#tasks[index] = { ...this.#tasks[index], ...updates };
        return this.#tasks[index];
    }

    deleteTask(id: number): boolean 
    {
        const initialLength = this.#tasks.length;
        //залишаємо в масиві тільки ті задачі, ід яких не збігається з переданим
        this.#tasks = this.#tasks.filter(t => t.id !== id);
        //якщо довжина змінилася то видалення пройшло успішно
        return this.#tasks.length < initialLength;
    }
    //гетер масиву задач
    get tasks(): Task[] 
    {
        return [...this.#tasks];
    }

    //геттер кількості задач
    get count(): number 
    {
        return this.#tasks.length;
    }

    //метод пошуку за ід
    getById(id: number): Task | undefined 
    {
        return this.#tasks.find(task => task.id === id);
    }
    
}

class FilteredTaskManager extends TaskManager 
{
    //метод фільтрації за статусом
    public getByStatus(status: Status): Task[] 
    {
        return this.tasks.filter(task => task.status === status);
    }

    //метод фільтрації за пріоритетом
    public getByPriority(priority: Priority): Task[] 
    {
        return this.tasks.filter(task => task.priority === priority);
    }

    //метод фільтрації за робітником
    public getByAssignee(assignee: string): Task[] 
    {
        return this.tasks.filter(task => task.assignee === assignee);
    }

    //метод повернення просрочених задач
    public getOverdue(): Task[] 
    {
        const now = new Date();
        return this.tasks.filter(task => task.dueDate && task.dueDate < now &&
            (task.status !== "done" && task.status !== "cancelled")
        );
    }
}

console.log("=== Завдання 3: Класи та модифікатори доступу ===");

const manager = new FilteredTaskManager();

const task1 = manager.addTask({
  title: "Розробити API",
  description: "REST API для задач",
  status: "in_progress",
  priority: "high",
  assignee: "Іван",
  dueDate: new Date("2025-02-01"),
});

manager.addTask({
    title: "Написати тести",
    description: "Покрити unit-тестами основну логіку",
    status: "todo",
    priority: "medium",
    assignee: null,
    dueDate: new Date("2025-02-15"),
});

manager.addTask({
    title: "Налаштувати БД",
    description: "Підключити PostgreSQL, виконати міграції",
    status: "done",
    priority: "critical",
    assignee: "Олена Коваль",
    dueDate: new Date("2025-01-20"),
});

manager.addTask({
    title: "Оновити документацію",
    description: "Описати API у Swagger",
    status: "todo",
    priority: "low",
    assignee: null,
    dueDate: null,
});

manager.addTask({
    title: "Code review",
    description: "Перевірити pull request від команди",
    status: "cancelled",
    priority: "medium",
    assignee: "Андрій Лисенко",
    dueDate: new Date("2025-01-25"),
});

console.log("Додано:", task1);
console.log("Кількість задач:", manager.count);

console.log("Всього задач: " + manager.count);

console.log("\nПошук за статусом 'todo': ");
console.log(manager.getByStatus("todo"));

console.log("\nпошук за робітником 'Олена Коваль':");
console.log(manager.getByAssignee("Олена Коваль"));

console.log("\nпошук за статусом: ");
console.log(manager.getByPriority("high"));

console.log("\nперевірка прострочених задач: ");
console.log(manager.getOverdue());

console.log("\nоновлення задачі №1 (зміна статусу): ");
manager.updateTask(1, { status: "done", assignee: "DrPepper" });
console.log(manager.getById(1));

console.log("\nВидалення задачі №4:");
const isDeleted = manager.deleteTask(4);
console.log(" видалено: " + isDeleted + ". Залишилось задач:  " + manager.count);


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

type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T; loadedAt: Date };
type ErrorState = { status: "error"; message: string; code: number };

type FetchState<T> = LoadingState | SuccessState<T> | ErrorState;

//Guard функція для завантажуваного стану
function isLoadingState(state: FetchState<unknown>): state is LoadingState {
    return state.status === "loading";
}
//Guard функція для успішного стану
function isSuccessState<T>(state: FetchState<T>): state is SuccessState<T> {
    return state.status === "success";
}
//Guard функція для провального стану
function isErrorState(state: FetchState<unknown>): state is ErrorState {
    return state.status === "error";
}
//функція для повернення рядку залежно від стану
function renderState<T>(state: FetchState<T>, renderData: (data: T) => string): string 
{
    if (isLoadingState(state)) 
    { return "⏳ Завантаження..."; }
    if (isSuccessState(state)) 
    { return "✅ Завантажено о " + state.loadedAt.toLocaleTimeString() + ": " + renderData(state.data); }
    if (isErrorState(state)) 
    { return "❌ Помилка " + state.code + ": " + state.message; }
    return "Невідомий стан";
}

function processValue(value: string | number | boolean | null | undefined): string 
{
    if (value === null || value === undefined) 
    { return "(порожнє значення)"; }

    //перевірка на рядок
    if (typeof value === "string") 
    { return "Рядок: '" + value + "' (" + value.length + " символів)"; }

    //перевірка на число
    if (typeof value === "number") 
    {
        let parity: string;
        if (value % 2 === 0) 
        { parity = "парне";} 
        else 
        { parity = "непарне";}
        
        return "Число: " + value + " (" + parity + ")";
    }

    //перевірка на булеве значення
    if (typeof value === "boolean") 
    {
        let boolText: string;
        
        if (value === true) 
        { boolText = "так"; } 
        else 
        { boolText = "ні"; }
        
        return "Булеве: " + boolText;
    }

    return "Невідомий тип";
}

//функція, що повертає повертає мітку статусу
function getStatusLabel(status: Status): string 
{
    switch (status) 
    {
        case "todo":
            return "Очікує виконання";
        case "in_progress":
            return "У процесі";
        case "done":
            return "Завершено";
        case "cancelled":
            return "Скасовано";
        default:
            //обробка випадку неіснуючого статусу
            const _exhaustiveCheck: never = status;
            return _exhaustiveCheck;
    }
}

console.log("=== Завдання 5: Type Guards та звуження типів ===");

const states: FetchState<Task[]>[] = [
  { status: "loading" },
  { status: "success", data: [], loadedAt: new Date() },
  { status: "error", message: "Not found", code: 404 },
];

states.forEach((state) => {
  console.log(renderState(state, (tasks) => `${tasks.length} задач`));
});

// Демонстрація processValue
const values: (string | number | boolean | null | undefined)[] = [
  "TypeScript",
  42,
  true,
  null,
  undefined,
  0,
  "",
];
values.forEach((v) => console.log(processValue(v)));
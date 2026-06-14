import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import * as taskEntity from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
  private tasks: taskEntity.Task[] = [
    { 
        id: '1', 
        title: 'Task_1', 
        description: 'task-1 description adsadas', 
        status: 'pending', 
        priority: 'medium', 
        createdAt: '2025-01-01T10:00:00.000Z' 
    },
    { 
        id: '2', 
        title: 'Task_2', 
        description: 'task-2 description kkofdgk', 
        status: 'in-progress', 
        priority: 'high', 
        createdAt: '2025-02-01T10:00:00.000Z' 
    },
    { 
        id: '3', 
        title: 'Task_3', 
        description: 'task-2 description vknbxlcn', 
        status: 'done', 
        priority: 'low', 
        createdAt: '2025-03-01T10:00:00.000Z' 
    }
  ];

  // GET /tasks
  // Повертає весь масив задач
  @Get()
  findAll(): taskEntity.Task[] 
  {
    // TODO: повернути масив tasks
    return this.tasks; 
  }

  // GET /tasks/search?status=pending
  // Якщо параметр status не передано — повертає всі задачі
  // Якщо передано — фільтрує масив за полем status
  // Важливо: цей маршрут має бути оголошений до @Get(':id')
  @Get("search")
  findByStatus(@Query("status") status?: string): taskEntity.Task[] {
    // TODO: реалізувати фільтрацію
    if(!status) { return this.tasks; }
    return this.tasks.filter(task => task.status === status); 
  }

  // GET /tasks/:id
  // Якщо задачу не знайдено — повернути об'єкт { message: '...' }
  @Get(":id")
  findOne(@Param("id") id: string): taskEntity.Task | { message: string } {
    // TODO: знайти задачу за id
    const foundTask = this.tasks.find(task => task.id === id);
    if (!foundTask)
    {
        return { message: "Задачу не знайдено."}
    } 
    return foundTask; 
  }

  // POST /tasks
  // Створює нову задачу зі статусом 'pending' та поточним часом
  // id генерується як Date.now().toString()
  @Post()
  create(@Body() dto: CreateTaskDto): taskEntity.Task {
    // TODO: створити та додати задачу до масиву
    const newTask: taskEntity.Task = 
    {
        id: Date.now().toString(), 
        title: dto.title,
        description: dto.description ?? "",
        status: 'pending',
        priority: dto.priority,
        createdAt: new Date().toString()
    };
    
    this.tasks.push(newTask);
    return newTask;
  }

  // DELETE /tasks/:id
  // Якщо задачу не знайдено — повернути об'єкт { message: '...' }
  // Якщо знайдено — видалити та повернути підтвердження
  @Delete(":id")
  remove(@Param("id") id: string): { message: string } {
    // TODO: видалити задачу за id
    const foundTask = this.tasks.find(task => task.id === id);
    if (!foundTask)
    {
        return { message: "Задачу не знайдено."}
    } 
    this.tasks = this.tasks.filter(task => task.id != id)
    return { message: "Задачу видалено."}
  }
}
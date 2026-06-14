import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo';


const BASE_URL = 'http://localhost:3001/todos';


export const todosApi = {
  //отримати всі
  getAll: async (): Promise<Todo[]> => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Помилка завантаження списку');
    return response.json();
  },


  //створення ПОСТу
  create: async (data: CreateTodoDto): Promise<Todo> => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Помилка при створенні');
    return response.json();
  },


  //оновлення патчу
  update: async (id: number, data: UpdateTodoDto): Promise<Todo> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Помилка при оновленні');
    return response.json();
  },


  //видалення
  remove: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Помилка при видаленні');
  },
};

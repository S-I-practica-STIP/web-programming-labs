import type { Task } from '../types/task';

export const INITIAL_TASKS: Task[] = [
  {
    id: 'qa-1',
    title: 'Написання тест-плану для модуля авторизації',
    description: 'Скласти перелік перевірок (позитивні/негативні сценарії) для нової форми входу (Варіант QA)',
    status: 'done',
    priority: 'high',
    createdAt: new Date().toLocaleDateString('uk-UA'),
  },
  {
    id: 'qa-2',
    title: 'Проведення регресійного тестування сайту',
    description: 'Перевірити працездатність основного функціоналу перед запланованим релізом',
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date().toLocaleDateString('uk-UA'),
  },
  {
    id: 'qa-3',
    title: 'Автоматизація API тестів (Postman/Playwright)',
    description: 'Покрити автотестами основні ендпоінти отримання списку завдань та фільтрації',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date().toLocaleDateString('uk-UA'),
  },
  {
    id: 'qa-4',
    title: 'Репорт багів мобільної версії застосунку',
    description: 'Зафіксувати дефекти відображення карток завдань на екранах з розширенням менше 375px',
    status: 'todo',
    priority: 'low',
    createdAt: new Date().toLocaleDateString('uk-UA'),
  }
];
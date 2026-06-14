import TaskCard from '../TaskCard/TaskCard';
import type { Task, TaskStatus } from '../../types/task';
import styles from './TaskList.module.css';


//
interface TaskListProps 
{
    tasks: Task[]; //масив об'єктів задач
    onDelete: (id: string) => void; //функція видалення
    onStatusChange: (id: string, status: TaskStatus) => void; // функція зміни статусу
}
//функція, що приймає і обробляє props
export default function TaskList(props: TaskListProps) 
{  
    const { tasks, onDelete, onStatusChange } = props;


    //перевірка на порожній список
    if (tasks.length === 0) 
    {
        return (
        <p className={styles.emptyMessage}> Задач немає. Додайте першу задачу!</p>
        );
    }


    //рендеринг списку
    return (
        <div className={styles.container}>
        {tasks.map((task) => (
            <TaskCard 
            key={task.id} //унікальний ключ
            task={task} // передаємо дані задачі
            onDelete={onDelete} // передача функції видалення 
            onStatusChange={onStatusChange} //передача функції зміни статусу
            />
        ))}
        </div>
    );
}

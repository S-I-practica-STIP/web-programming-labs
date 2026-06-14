import clsx from 'clsx';
import type { Task, TaskStatus } from '../../types/task';
import styles from './TaskCard.module.css';


interface TaskCardProps 
{
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}


export default function TaskCard(props: TaskCardProps) 
{
    //деструктуризація 
    const { task, onDelete, onStatusChange } = props;


    //підготовлюємо дату
    const formattedDate = task.createdAt.toLocaleDateString('uk-UA');


    //обробник події кліку на кнопку видалення. визивае колбек 
    const handleDelete = () => {
        onDelete(task.id);
    };
    //обробник події зміни статусу. визивае колбек
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onStatusChange(task.id, e.target.value as TaskStatus);
    };


    //повертаємо результат
    return (
        //встановлення класу в залежності від пріоритету
        <div className={clsx(styles.card, 
        {
            [styles.cardLow]: task.priority === 'low',
            [styles.cardMedium]: task.priority === 'medium',
            [styles.cardHigh]: task.priority === 'high',
        })}>
            {/* виводимо заголовок */}
            <h3 className={styles.title}>{task.title}</h3>
            {/*якщо task.description є, тоді малюємо description*/}
            {task.description && <p className={styles.description}>{task.description}</p>}
            
            {/*виводимо дані про дату і пріоритет */}
            <div className={styles.meta}>
                <span>Дата: {formattedDate}</span>
                <span>Пріоритет: {task.priority}</span>
            </div>
            {/*елементи дій*/}
            <div className={styles.actions}>
                {/*створення випадаючого списку*/}
                <select value={task.status} onChange={handleStatusChange}>
                    <option value="todo">Треба зробити</option>
                    <option value="in-progress">В роботі</option>
                    <option value="done">Готово</option>
                </select>
                {/*кнопка видалення*/}
                <button onClick={handleDelete} className={styles.deleteBtn}>
                    Видалити
                </button>
            </div>
        </div>
    );
}

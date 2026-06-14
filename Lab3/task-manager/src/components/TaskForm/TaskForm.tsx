import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./TaskForm.module.css";

import { z } from "zod";

const taskSchema = z.object({
    title: z
    .string()
    .min(3, "Заголовок має містити щонайменше 3 символи")
    .max(100, "Заголовок не може перевищувати 100 символів"),
    description: z.string().max(500, "Опис не може перевищувати 500 символів"),
    priority: z.enum(["low", "medium", "high"], {
    message: "Оберіть пріоритет",
    }),
});

export type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
    onSubmit: (data: TaskFormData) => void; 
}
//функція, що приймає і обробляє props
export default function TaskForm(props: TaskFormProps) {
    const { onSubmit } = props;

    //ініціалізація форми 
    const 
    {
        register,
        handleSubmit, //обгортка, що викликає валідацію перед сабмітом
        reset, // метод для очищення полів
        formState: { errors }, //помилки
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema), //зв'язка хука та зоду
    });

    //функція, яка спрацює, якщо валідація пройшла успішно
    const handleFormSubmit = (data: TaskFormData) => {
        onSubmit(data);
        reset(); // Скидання форми (Етап 5.2)
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
        {/*поле Title */}
        <div className={styles.field}>
            <label htmlFor="title">Назва задачі</label>
            <input 
            id="title"
            {...register("title")} 
            placeholder="Введіть назву" 
            />
            {/*вивід помилки, якщо вона є */}
            {errors.title && <span className={styles.error}>{errors.title.message}</span>}
        </div>

        {/*поле Description */}
        <div className={styles.field}>
            <label htmlFor="description">Опис</label>
            <textarea 
            id="description"
            {...register("description")} 
            placeholder="Додайте опис" 
            />
            {errors.description && <span className={styles.error}>{errors.description.message}</span>}
        </div>

        {/*поле Priority */}
        <div className={styles.field}>
            <label htmlFor="priority">Пріоритет</label>
            <select id="priority" {...register("priority")}>
            <option value="">Оберіть пріоритет</option>
            <option value="low">Низький</option>
            <option value="medium">Середній</option>
            <option value="high">Високий</option>
            </select>
            {errors.priority && <span className={styles.error}>{errors.priority.message}</span>}
        </div>

        <button type="submit" className={styles.submit}>Додати задачу</button>
        </form>
    );
}
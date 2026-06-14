import { NavLink, Outlet } from "react-router";
import styles from "./Layout.module.css";

export default function Layout() 
{  
    //функція для визначення стилю посилання (активне/неактивне)
    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <span className={styles.logo}>📋 Task Manager</span>
                <nav className={styles.nav}>
                    {/*посилання на список задач з атрибутом енд для точного співпадіння */}
                    <NavLink to="/tasks" end className={getLinkClass}>
                        Всі задачі
                    </NavLink>

                    {/*посилання на створення нової задачі */}
                    <NavLink to="/tasks/new" className={getLinkClass}>
                    + Нова задача
                    </NavLink> 
                </nav>
            </header>

            <main className={styles.main}><Outlet /></main>
        </div>
    );
}
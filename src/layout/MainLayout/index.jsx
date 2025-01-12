import { Link } from 'react-router-dom';
import styles from "./index.module.css";

function MainLayout({ children }) {
    return (
        <>
            <header>
                <div className={`${styles.container} ${styles.header__container}`}>
                    <div className={styles.logo}>
                        Muhsinjon.
                    </div>
                    <div className={styles.nav}>
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </div>
            </header>
            <main>
                {children}
            </main>
        </>
    );
}

export default MainLayout;
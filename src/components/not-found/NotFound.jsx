import { Link } from 'react-router';
import styles from './NotFound.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>

            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>Are You Lost?</h1>
                <p className={styles.subtitle}>
                    It looks like the page you are looking for is missing.
                </p>
                <p className={styles.additionalText}>
                    Don't worry! Let's get you back on track.
                </p>
                <Link to="/" className={styles.button}>
                    Go Home
                </Link>
            </div>
        </div>
    );
}
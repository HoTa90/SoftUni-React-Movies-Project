import { Link } from 'react-router';
import styles from './NotFound.module.css'; // Import the CSS module

export default function NotFound() {
    return (
        <div className={styles.container}>
            {/* Overlay for better text visibility */}
            <div className={styles.overlay}></div>

            {/* Content */}
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
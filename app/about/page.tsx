import { Metadata } from 'next';
import styles from './About.module.css';

export const dynamic = 'force-static'; // no necessary, just for demonstration

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About NextSpace',
};

export default function Blog() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.description}>
          We are a social media company dedicated to bringing people together.
          Connect, share, and explore a community that celebrates collaboration
          and creativity.
        </p>
      </div>
    </div>
  );
}

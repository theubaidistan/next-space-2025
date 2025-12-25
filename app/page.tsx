// Home.tsx or Home.jsx
import styles from './page.module.css';
export default function Home() {
  return (
    // <div>
    //   <h1>Welcome to NextSpace!</h1>
    //   <p>
    //     A next-gen social media app to connect with frens inspired by MySpace
    //   </p>
    //   <p>To get started, sign up for an account</p>
    // </div>

    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>NextSpace</h1>
        <p className={styles.subtitle}>
          A next-gen social media app inspired by MySpace
        </p>
        <p className={styles.text}>
          Connect with friends, customize your space, and express yourself.
        </p>

        <a href="/blog" className={styles.button}>
          Get Started
        </a>
      </div>
    </div>
  );
}

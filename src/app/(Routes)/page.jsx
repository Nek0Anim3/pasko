import styles from "./page.module.css"

export default function Farm() {
  return  (
    <main>
      <div className={styles.clickerContent}>
        <div className={styles.clickerContainer}>
          <button className={styles.paskoEblet}>123</button>
          <p className={styles.pointsText}>2817329</p>
        </div>
      </div>
    </main>
  )
}
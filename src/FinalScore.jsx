import React, { useEffect, useState } from "react";
import styles from "./FinalScore.module.css";

const FinalScore = ({ score, onRestart }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = score;
    const speed = 20;

    const timer = setInterval(() => {
      start += 1;
      if (start > end) start = end;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className={styles.finalBg}>
      <div className={styles.finalWrapper}>

        <button className={styles.keepLearning}>
          Keep Learning!
        </button>

        <h2 className={styles.finalTitle}>Your Final score is</h2>

        <div className={styles.scoreRow}>
          <span className={styles.scoreNumber}>{count}</span>
          <span className={styles.percent}>%</span>
        </div>

        <button className={styles.startAgain} onClick={onRestart}>
          Start Again
        </button>

      </div>
    </div>
  );
};

export default FinalScore;

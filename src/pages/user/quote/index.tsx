import { NavLink, Outlet } from "react-router-dom";
//css
import styles from "./quote.module.scss";
import { useState } from "react";
import Letter from "./letter";
import Package from "./package";

const Quote = () => {
  const [isActive, setIsActive] = useState(true);
  const [letterActive, setLetterActive] = useState(true);
  const [packageActive, setPackageActive] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ul className={styles.menuContainer}>
          <button
            className={`${isActive ? styles.active : styles.btn}`}
            onClick={() => {
              setLetterActive(true);
              setPackageActive(false);
              setIsActive(true);
            }}
          >
            Letter
          </button>
          <button
            className={`${isActive ? styles.btn : styles.active}`}
            onClick={() => {
              setLetterActive(false);
              setPackageActive(true);
              setIsActive(false);
            }}
          >
            package
          </button>
        </ul>
      </div>
      {letterActive && <Letter />}
      {packageActive && <Package />}
    </div>
  );
};

export default Quote;

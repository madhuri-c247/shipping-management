import { NavLink } from "react-router-dom";
//css
import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={`${styles.container} d-flex-r`}>
      <h3 className={`${styles.heading}`}>Ship Now</h3>
      <ul className={`${styles.menuContainer} d-flex-r`}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to={"/home/letter-selection"}
        >
          HOME
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to={"/signup"}
        >
          SignUp
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to={"/login"}
        >
          Login
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;

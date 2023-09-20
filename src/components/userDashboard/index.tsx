import { NavLink } from "react-router-dom";
//react-icons
import { TfiMenuAlt } from "react-icons/tfi";
import { LuFolder } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import {
  MdOutlineLocalShipping,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { FiSettings } from "react-icons/fi";
//CSS
import styles from "./userDashboard.module.scss";

const UserDashboard = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.content} d-flex-col`}>
        <h1>ShipNow</h1>
        <ul className="d-flex-col">
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={"/user/quote"}
          >
            <TfiMenuAlt className={styles.icon} />
            Quote
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={"/user/saved-quotes"}
          >
            <LuFolder className={styles.icon} /> Saved Quotes
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={"/user/shipment"}
          >
            <MdOutlineLocalShipping className={styles.icon} />
            My Shipment
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={"/user/setting"}
          >
            <FiSettings className={styles.icon} />
            Account Setting
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={"/user/notification"}
          >
            <MdOutlineNotificationsActive className={styles.icon} />
            Notifications
          </NavLink>
        </ul>
      </div>
      <NavLink className={styles.logout} to={"/login"}>
        <RiLogoutCircleLine /> Logout
      </NavLink>
    </div>
  );
};

export default UserDashboard;

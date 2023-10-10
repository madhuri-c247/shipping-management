import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
//react-icons
import { TfiMenuAlt } from "react-icons/tfi";
import { LuFolder } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
//CSS
import styles from "./userDashboard.module.scss";

const UserDashboard = () => {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setSpinner(true);
    navigate("/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>ShipNow</h1>
        <ul>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={"/user/quote/letter"}
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
            Setting
          </NavLink>
        </ul>
      </div>
      <Button className={styles.logout} onClick={handleLogout}>
        <RiLogoutCircleLine /> Logout
      </Button>
    </div>
  );
};

export default UserDashboard;

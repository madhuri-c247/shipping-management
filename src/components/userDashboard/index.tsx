import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
//react-icons
import { TfiMenuAlt } from "react-icons/tfi";
import { LuFolder } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import {
  MdOutlineLocalShipping,
} from "react-icons/md";
import { FiSettings } from "react-icons/fi";
//CSS
import styles from "./userDashboard.module.scss";

const UserDashboard = () => {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    setSpinner(true)
    setInterval(() => {
      navigate('/login')
    }, 1000)
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>ShipNow</h1>
        <ul>
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
        </ul>
      </div>
      {spinner ?
        <span className={`spinner`}><Spinner animation="border" variant="dark" /></span>
        : ''}
      <Button className={styles.logout} onClick={handleLogout}>
        <RiLogoutCircleLine /> Logout
      </Button>
    </div>
  );
};

export default UserDashboard;

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
import styles from "../userDashboard/userDashboard.module.scss";

const AdminDashboard = () => {
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
            to={"/admin/saved-quotes"}
          >
            <TfiMenuAlt className={styles.icon} />
            Saved Quote
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={"/admin/all-users"}
          >
            <LuFolder className={styles.icon} /> User
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={"/admin/all-shipment"}
          >
            <MdOutlineLocalShipping className={styles.icon} />
            Shipment
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={"/admin/report"}
          >
            <MdOutlineLocalShipping className={styles.icon} />
           Report
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={"/admin/admin-setting"}
          >
            <FiSettings className={styles.icon} />
             Setting
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

export default AdminDashboard;

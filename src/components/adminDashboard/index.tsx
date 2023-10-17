import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
//react-icons
import { TfiMenuAlt } from "react-icons/tfi";
import { LuFolder } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdOutlineLocalShipping } from "react-icons/md";
import { GoReport } from "react-icons/go";
//CSS
import styles from "../userDashboard/userDashboard.module.scss";
import AlertDialogSlide from "../../common/alert";
import { useState } from "react";

const AdminDashboard = () => {
  const [alert, setAlert] = useState(false);
  const handleLogout = () => {
    setAlert(true);
  };
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
            <GoReport className={styles.icon} />
            Report
          </NavLink>
          <button onClick={handleLogout}>
            <span>
              <RiLogoutCircleLine className={styles.icon} /> Logout
            </span>
          </button>
        </ul>

        {alert && <AlertDialogSlide alert={alert} setAlert={setAlert} />}
      </div>
    </div>
  );
};

export default AdminDashboard;

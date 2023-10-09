import { NavLink, Outlet } from "react-router-dom";
//components
import AdminDashboard from "../../components/adminDashboard";
//css
import styles from "./admin.module.scss";

const Admin = () => {
  return (
    <div className={styles.container}>
      <AdminDashboard />
      <div className={styles.content}>
        <div className={styles.header}>
          <pre>
            You're Logged In as Admin.
            <NavLink to={""}> Login As User</NavLink>
          </pre>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;

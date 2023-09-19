import { NavLink, Outlet } from "react-router-dom";
//components
import UserDashboard from "../../components/userDashboard";
//css
import styles from "./user.module.scss";

const User = () => {
  return (
    <div className={styles.container}>
      <UserDashboard />
      <div className={styles.content}>
        <div className={styles.header}>
          <pre>
            You're Logged In as {`UserName`}.
            <NavLink to={""}>Return To Your account</NavLink>
          </pre>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default User;

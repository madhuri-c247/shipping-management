import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { USER_URL } from "../../apiHelper";
import axios from "axios";
//components
import UserDashboard from "../../components/userDashboard";
//css
import styles from "./user.module.scss";

const User = () => {
  const token = sessionStorage.getItem("token");
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState({
    firstName: "",
    lastName: "",
  });
  useEffect(() => {
    try {
      axios
        .get(USER_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSuccess(true);
          setUserName({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
          });
        })
        .catch((err) => {
          setSuccess(false);
        });
    } catch (error) {
      setSuccess(false);
    }
  }, []);
  return (
    <div className={styles.container}>
      <UserDashboard />
      <div className={styles.content}>
        <div className={styles.header}>
          {success ? (
            <pre>
              You're Logged In as
              <span
                className={styles.userName}
              >{`${userName.firstName} ${userName.lastName}`}</span>
              .<NavLink to={"/login"}>Return To Your account</NavLink>
            </pre>
          ) : (
            <pre className="error" style={{fontSize:'14px'}}>Something is Wrong!</pre>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default User;

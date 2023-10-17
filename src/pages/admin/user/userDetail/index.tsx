import axios from "axios";
import React, { useEffect, useState } from "react";
import { ADMIN_SINGLE_USER_URL } from "../../../../apiHelper";
import { NavLink, useParams } from "react-router-dom";
import ToastView from "../../../../components/Toast";
//CSS
import styles from "../../../user/accountSetting/setting.module.scss";
const UserDetail = () => {
  const [toast, setToast] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [lastLoggedIn, setLastLoggedIn] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const { id } = useParams();

  const [user, setUser] = useState({
    companyName: "",
    email: "",
    firstName: "",
    lastName: "",
    verification: "",
    number: "",
    lastLoggedIn: "",
    createdAt: "",
  });
  const token = sessionStorage.getItem("token");
  const fetchUser = async () => {
    try {
      await axios
        .get(`${ADMIN_SINGLE_USER_URL}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser({ ...res.data.result[0] });
        })
        .catch((error) => {
          setToast(true);
          setSuccess(false);
          setMessage("Something");
        });
    } catch (error) {}
  };
  useEffect(() => {
    if (user.createdAt && user.lastLoggedIn) {
      const dateObject = new Date(user.lastLoggedIn);
      const logged = dateObject.toLocaleDateString();
      setLastLoggedIn(logged);
      const object = new Date(user.createdAt);
      setCreatedAt(object.toLocaleDateString());
    }

    fetchUser();
  }, [user]);
  return (
    <div className={`${styles.container}`}>
      <form className={`${styles.content} d-flex-r `}>
        <div className={`${styles.info}`}>
          <div className="card" style={{ width: "100%", textAlign: "left" }}>
            {user && (
              <ul className="list-group list-group-flush text-capitalize fs-6 ">
                <li className="list-group-item text-light bg-dark fw-bold fs-5">
                  <span>User</span> <span>Detail </span>
                </li>
                <li className="list-group-item">
                  <span className="text-dark">Company Name:</span>{" "}
                  <span className="text-dark">{user.companyName}</span>
                </li>
                <li className="list-group-item">
                  <span> Email:</span>{" "}
                  <span className="text-dark">{user.email} </span>
                </li>
                <li className="list-group-item">
                  <span> First Name:</span>{" "}
                  <span className="text-dark">{user.firstName}</span>
                </li>
                <li className="list-group-item">
                  <span> Last Name:</span>
                  <span className="text-dark">{user.lastName}</span>
                </li>
                <li className="list-group-item">
                  <span>Verification:</span>{" "}
                  <span className="text-dark">
                    {user.verification ? "Yes" : "No"}
                  </span>
                </li>
                <li className="list-group-item">
                  <span>Phone Number:</span>{" "}
                  <span className="text-dark">{user.number}</span>
                </li>
                <li className="list-group-item">
                  <span>Created At:</span>{" "}
                  <span className="text-dark">{createdAt}</span>
                </li>
                <li className="list-group-item">
                  <span>Last Logged In:</span>{" "}
                  <span className="text-dark">{lastLoggedIn}</span>
                </li>
              </ul>
            )}
          </div>
          <NavLink
            className="float-end mt-2 btn btn-dark"
            to={"/admin/all-users"}
          >
            View All User
          </NavLink>
        </div>
      </form>
      {toast ? (
        <ToastView message={message} success={success} setToast={setToast} />
      ) : (
        ""
      )}
    </div>
  );
};

export default UserDetail;

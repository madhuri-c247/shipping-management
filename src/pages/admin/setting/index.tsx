import axios from "axios";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
//assests
import emptyProfile from "../../../assets/emptyProfile.webp";
//CSS
import styles from "../../user/accountSetting/setting.module.scss";
//common
import Button from "../../../common/button";
//apiHelper
import { USER_UPDATE_URL, USER_URL } from "../../../apiHelper";

const AdminSetting: React.FC = () => {
  const [message, setMessage] = useState("");
  const [Successful, setSuccessful] = useState(false);
  const [input, setInput] = useState({
    email: "",
    firstName: "",
    lastName: "",
    number: "",
    companyName: "",
  });

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    try {
      axios
        .get(USER_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setInput({ ...res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      setMessage("Something is wrong!");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("update");
    axios
      .put(
        USER_UPDATE_URL,
        {
          ...input,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.message);
        setSuccessful(true);
        setMessage(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const changePassword = () => {};

  return (
    <div className={`${styles.container}`}>
      <form className={`${styles.content} d-flex-r `} onSubmit={handleSubmit}>
        <div className={`${styles.info}`}>
          <h5>Account Setting</h5>
          <div className={`${styles.detail}`}>
            <div className={`${styles.formContent}`}>
              <label>E-mail Address</label>
              <input
                name="email"
                readOnly
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
                value={input.email}
              />
            </div>

            <div className={`${styles.password} d-flex-col`}>
              <label>Password </label>
              <button name="password" onClick={changePassword}>
                {" "}
                Change Your Password
              </button>
            </div>
          </div>
          <h5 className="mt-5">Personal Info</h5>
          <div className={`${styles.personalInfo}`}>
            <div className={`${styles.input} d-flex-r`}>
              <div className={`${styles.formContent}`}>
                <label>First Name </label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={handleChange}
                  value={input.firstName}
                />
              </div>

              <div className={`${styles.formContent}`}>
                <label>Last Name </label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={input.lastName}
                />
              </div>
            </div>

            <div className={`${styles.input} d-flex-r`}>
              <div className={`${styles.formContent} `}>
                <label className="">Company Name </label>
                <input
                  className=""
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  onChange={handleChange}
                  value={input.companyName}
                />
              </div>

              <div className={`${styles.formContent}`}>
                <label>Phone Number</label>
                <input
                  name="number"
                  type="tel"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={input.number}
                />
              </div>
            </div>
          </div>

          {Successful ? (
            <h6 className={`${styles.message} success m-1`}>{message}</h6>
          ) : (
            <h6 className={`${styles.message} error m-1`}>{message}</h6>
          )}
          <div className={`${styles.submit}`}>
            <Button className="btn" value="save changes" />
          </div>
        </div>
        <div className={`${styles.profile} mt-5`}>
          <img src={emptyProfile} alt="empty Profile" />
          <h6>
            Upload Image{" "}
            <span>
              <FaEdit />
            </span>
          </h6>

          <div className={`${styles.delete}`}>
            <a>Delete Your Account</a>
            <p>
              Deleting Your Account will Loss all your data. Check Your data
              before deleting Your account.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AdminSetting;

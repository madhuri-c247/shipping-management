import axios from "axios";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
//CSS
import styles from "../../../user/accountSetting/setting.module.scss";
//common
import Button from "../../../../common/button";

import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_SINGLE_USER_URL, ADMIN_USER_UPDATE_URL } from "../../../../apiHelper";

const UpdateUser: React.FC = () => {
  const [message, setMessage] = useState("");
  const [Successful, setSuccessful] = useState(false);
  const location = useLocation();
  const { id } = location.state;
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    number: "",
    companyName: "",
  });

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(`${ADMIN_SINGLE_USER_URL}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setInput({ ...res.data[0] });
        })
        .catch((err) => {
          setMessage(err.data.response.error);
        });
    } catch (error) {
      setMessage("Something is wrong!");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await axios.put(`${ADMIN_USER_UPDATE_URL}${id}`,{
            ...input
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((res)=>{
            console.log(res)
            navigate('/admin/all-users')
        }).catch((error)=>{
            console.log(error)
        })
    } catch (error) {
        
    }
    // navigate("/admin/all-users");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div className={`${styles.container}`}>
      <form className={`${styles.content} d-flex-r `} onSubmit={handleSubmit}>
        <div className={`${styles.info}`}>
          <h4>Update User</h4>
          <div className={`${styles.personalInfo}`}>
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
            <div className={`${styles.submit}`}>
            <Button className={`${styles.btn}`} value="save changes" />
          </div>
          </div>

          {Successful ? (
            <h6 className={`${styles.message} success m-1`}>{message}</h6>
          ) : (
            <h6 className={`${styles.message} error m-1`}>{message}</h6>
          )}
         
        </div>
      </form>
    </div>
  );
};
export default UpdateUser;

import axios from "axios";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
//CSS
import styles from "./setting.module.scss";
//common
import Button from "../../../common/button";
//apiHelper
import {
  USER_PROFILE_URL,
  USER_UPDATE_URL,
  USER_URL,
} from "../../../apiHelper";
import { useNavigate } from "react-router-dom";

const Setting: React.FC = () => {
  const [message, setMessage] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [imageUploaded, setImageUploaded] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [Successful, setSuccessful] = useState(false);
  const [input, setInput] = useState({
    email: "",
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
        .get(USER_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setInput({ ...res.data });
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
        setSuccessful(true);
        setMessage(res.data.message);
      })
      .catch((error) => {
        setSuccessful(false);
        setMessage(error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const changePassword = () => {
    navigate("/user/change-password");
  };
  const handleDelete = () => {
    navigate("/users/delete-verification");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUploaded("");
    const files = e.target.files;
    if (files) {
      setImage(files[0]);
    }
  };
  const handleUpload = () => {
    setImageUploaded('')
    setSpinner(true);
    const formData = new FormData();
    if (image) {
      formData.append("avatar", image);
    }
    axios
      .post(USER_PROFILE_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSpinner(false);
        setImageUploaded(res.data.uploaded);
      })
      .catch((error) => {
        setSpinner(false);
        console.log(error)
        setImageUploaded(error.response.data.message);
      });
  };
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
              <button className="btn btn-dark" onClick={changePassword}>Change Your Password</button>
            </div>
          </div>
          <h5 className="mt-5">Personal Info</h5>
          <div className={`${styles.personalInfo}`}>
            <div className={`${styles.input} d-flex-r`}>
              <div className={`${styles.formContent}`}>
                <label>
                  First Name
                  <span className="required-asterisk" aria-label="required">
                    *
                  </span>
                </label>
                <input
                  name="firstName"
                  type="text"
                  className="input"
                  placeholder="First Name"
                  onChange={handleChange}
                  value={input.firstName}
                />
              </div>

              <div className={`${styles.formContent}`}>
                <label>
                  Last Name
                  <span className="required-asterisk" aria-label="required">
                    *
                  </span>{" "}
                </label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="input"
                  onChange={handleChange}
                  value={input.lastName}
                />
              </div>
            </div>

            <div className={`${styles.input} d-flex-r`}>
              <div className={`${styles.formContent} `}>
                <label className="">
                  Company Name
                  <span className="required-asterisk" aria-label="required">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  className="input"
                  placeholder="Company Name"
                  onChange={handleChange}
                  value={input.companyName}
                />
              </div>

              <div className={`${styles.formContent}`}>
                <label>
                  Phone Number{" "}
                  <span className="required-asterisk" aria-label="required">
                    *
                  </span>
                </label>
                <input
                  name="number"
                  type="number"
                  className="input" 
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
            <Button className={`${styles.btn}`} value="save changes" />
          </div>
        </div>
        <div className={`${styles.profile} mt-5`}>
        <label htmlFor="inputTag">
  Choose Image
 
          <input id="inputTag" type="file" onChange={handleImageChange} /> <FaEdit/>
</label>
          
          <button className="btn btn-primary" onClick={handleUpload}>
            {spinner ? "Processing.." : "Upload Image"}
          </button>
          {image ? (
            <h5 className={`${styles.message} success m-1`}>{imageUploaded}</h5>
          ) : (
            <h5 className={`${styles.message} error m-1`}>{imageUploaded}</h5>
          )}
          <div className={`${styles.delete}`}>
            <button className="btn btn-outline-danger" onClick={handleDelete}>Delete Your Account</button>
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
export default Setting;

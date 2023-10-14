import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//models
import { UserState } from "../../../../models/UserState";
//validations
import { changePasswordValidationSchema } from "../../../../utils/Validation";
//apiHelper
import { USER_CHANGE_PASSWORD_URL } from "../../../../apiHelper";
//components
import ToastView from "../../../../components/Toast";
//CSS
import styles from "./changePassword.module.scss";
//common
import Button from "../../../../common/button";

const ChangePassword = () => {
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: UserState) => {
    try {
      await axios
        .put(
          USER_CHANGE_PASSWORD_URL,
          {
            ...values,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          navigate("/user/setting", {
            state: {
              response: res.data.result.message,
            },
          });
        })
        .catch((error) => {
          setSuccess(false);
          setToast(true);
          setMessage(error.response.data.message);
        });
    } catch (error) {
      setSuccess(false);
      setToast(true);
      setMessage("Something is Wrong!");
    }
  };

  return (
    <div className={`${styles.container}`}>
      <Formik<UserState>
        initialValues={initialValues}
        validationSchema={changePasswordValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form className={` ${styles.form} `} onSubmit={formik.handleSubmit}>
            <h4 className="m-1">Change Password</h4>
            <p className={` ${styles.para} m-2`}>
              Enter the details to change your password :)
            </p>
            <div className={`${styles.formContent}`}>
              <label htmlFor="oldPassword">
                Old Password
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>
              <Field
                className="input"
                name="oldPassword"
                type="password"
                id="oldPassword"
              />
              <ErrorMessage
                name="oldPassword"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
            <div className={`${styles.formContent}`}>
              <label htmlFor="newPassword">
                New Password
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>
              <Field
                className="input"
                name="newPassword"
                type="password"
                id="newPassword"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
            <div className={`${styles.formContent}`}>
              <label htmlFor="confirmPassword">
                Confirm Password
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>
              <Field
                className="input"
                name="confirmPassword"
                type="password"
                id="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={`${styles.error} error`}
              />
            </div>

            <div className={`${styles.submit}`}>
              <Button
                className={`${styles.forgotBtn}`}
                value={loader ? "Processing.." : "Continue"}
              />
            </div>
          </form>
        )}
      </Formik>
      {toast ? (
        <ToastView message={message} success={success} setToast={setToast} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ChangePassword;

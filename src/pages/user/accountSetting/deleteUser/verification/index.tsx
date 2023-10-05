import axios from "axios";
import { UserState } from "../../../../../models/UserState";
import { useState } from "react";
import { USER_DELETE_VERIFY_URL } from "../../../../../apiHelper";
import styles from "../../../../login/forgetPassword/forgetPassword.module.scss";
import { ErrorMessage, Field, Formik } from "formik";
import { loginValidationSchema } from "../../../../../utils/Validation";
import Button from "../../../../../common/button";

const VerifyDeletingUser = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const initialValues = {
    email: "",
    password: "",
  };

  const token = sessionStorage.getItem("token");
  const handleSubmit = (values: UserState) => {
    try {
      
      axios
        .post(
          USER_DELETE_VERIFY_URL,
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
          setMessage('')
          setSuccess(res.data.email);
        })
        .catch((error) => {
           setSuccess('');
          setMessage(error.response.data.error);
        });
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className={`${styles.container}`}>
      <Formik<UserState>
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form className={` ${styles.form} `} onSubmit={formik.handleSubmit}>
            <h4 className="m-1">Delete Account</h4>
            <p className={` ${styles.para} m-2`}>
              Enter Your password and make sure you want to delete your account
            </p>

            <div className={`${styles.formContent}`}>
              <label>
                Email
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>
              <Field name="email" type="email" placeholder="Enter email" />
              <ErrorMessage
                name="email"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
            <div className={`${styles.formContent}`}>
              <label>
                Password
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Enter Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
            <div className={`${styles.submit}`}>
              {message ? (
                <h6 className={`${styles.message} error`}>{message}</h6>
              ) : (
                ""
              )}
              {success ? (
                <h6 className={`${styles.message} success`}>{success}</h6>
              ) : (
                ""
              )}
              <Button className={`${styles.forgotBtn}`} value={"Continue"} />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default VerifyDeletingUser;

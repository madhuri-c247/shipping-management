import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
//common
import Button from "../../../common/button";
//CSS
import styles from "./forgetPassword.module.scss";
//models
import { UserState } from "../../../models/UserState";
//apiHelper
import { FORGOT_PASSWORD_URL } from "../../../apiHelper";
//validations
import { emailValidationSchema } from "../../../utils/Validation";

export const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const initialValues = {
    email: "",
  };

  const handleSubmit = (values: UserState) => {
    axios
      .put(FORGOT_PASSWORD_URL, {
        email: values.email,
      })
      .then((res) => {
        setSuccess(res.data.email);
      })
      .catch((error) => {
        setMessage("");
        setMessage(error.response.data.message);
      });
  };
  return (
    <div className={`${styles.container} `}>
      <Formik<UserState>
        initialValues={initialValues}
        validationSchema={emailValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className={` ${styles.form} `} onSubmit={formik.handleSubmit}>
            <h4 className="m-1">Reset Password</h4>
            <p className={` ${styles.para} m-2`}>
              Enter Your email address and we will send you instructions to
              reset your password.
            </p>

            <div className={`${styles.formContent}`}>
              <label>
                Email{" "}
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>
              <Field name="email" type="email" placeholder="Enter Email" />
              <ErrorMessage
                name="email"
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

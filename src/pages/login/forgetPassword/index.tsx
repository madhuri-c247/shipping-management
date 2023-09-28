import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
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
  const initialValues = {
    email: "",
  };

  const handleSubmit = (values: UserState) => {
    axios
      .put(FORGOT_PASSWORD_URL, {
        email: values.email,
      })
      .then((res) => {
        setMessage("Please Check Your Mail");
      })
      .catch((error) => {
        setMessage(error.response.data[0].errors);
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
            <h4 className="m-1">Forgot Password</h4>
            <div className={`${styles.formContent}`}>
              <label>Email </label>
              <Field name="email" type="email" />
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
              <Button
                className={`${styles.forgotBtn}`}
                value={"Send Reset Link"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

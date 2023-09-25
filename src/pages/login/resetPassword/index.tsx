import React, { useEffect } from "react";
import { RESET_PASSWORD_URL } from "../../../apiHelper";
import axios from "axios";
import styles from "../login.module.scss";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { Form, useLocation } from "react-router-dom";
import Button from "../../../common/button";
import { UserState } from "../../../models/UserState";

const ResetPassword = () => {
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol, and be at least 8-16 characters long"
      ),
  });

  useEffect(() => {
    console.log("reset");
  }, [token]);

  // const token = sessionStorage.getItem('token')
  const handleSubmit = (values: UserState) => {
    axios.put(`${RESET_PASSWORD_URL}${token}`, {
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
    console.log(values, "value");
    console.log(token, "token");
  };
  return (
    <div className={`${styles.container} `}>
      <Formik<UserState>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className={` ${styles.form} `} onSubmit={formik.handleSubmit}>
            <h4 className="m-1">Reset Password</h4>

            <div className={`${styles.formContent}`}>
              <label>Password </label>
              <Field name="password" type="password" />
              <ErrorMessage
                name="password"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
            <div className={`${styles.formContent}`}>
              <label>Confirm Password </label>
              <Field name="confirmPassword" type="password" />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
            <div className={`${styles.submit}`}>
              {/* {message ? (
                <h6 className={`${styles.message} error`}>Sorry! {message}</h6>
              ) : (
                ""
              )} */}
              <Button value={"Reset Password"} className="forgot-btn" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;

import { ErrorMessage, Field, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
//common
import Button from "../../../common/button";
//CSS
import styles from "../login.module.scss";
//models
import { UserState } from "../../../models/UserState";
//store
import { AppDispatch } from "../../../redux/store";
//reducers
import { handleForgetPassword } from "../../../redux/reducers/userReducer";

export const ForgotPassword = () => {
  const [message, setMessage] = useState('');
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const initialValues = {
    email: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = (values: UserState) => {
   const response = dispatch(handleForgetPassword(values));
     
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
              <Button value={"Forgot Password"} className="forgot-btn" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

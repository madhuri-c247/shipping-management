import { ErrorMessage, Field, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "../../../common/button";
import styles from "../login.module.scss";
import * as Yup from "yup";
import { UserState } from "../../../models/UserState";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { handleForgetPassword } from "../../../redux/reducers/userReducer";
import { validationSchema } from "../../../utils/Validation";

export const ForgotPassword = () => {
  const [message, setMessage] = useState(false);
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const initialValues = {
    email:''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });


  useEffect(() => {}, []);

  const handleSubmit = (values: UserState) => {
    console.log(values,'value')
    // dispatch(handleForgetPassword(values));
    // setPassword(false)
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
            {/* <div className={`${styles.formContent}`}>
                  <label>New Password</label>
                  <Field name="password" type="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={`${styles.error} error`}
                  />
                </div>

                <div className={`${styles.formContent}`}>
                  <label>Confirm Password</label>
                  <Field name="confirmPassword" type="password" />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className={`${styles.error} error`}
                  />
                </div> */}

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
                <h6 className={`${styles.message} error`}>Sorry! {message}</h6>
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

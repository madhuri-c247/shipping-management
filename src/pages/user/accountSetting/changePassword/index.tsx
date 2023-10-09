import React, { useState } from "react";
import styles from "../../../login/forgetPassword/forgetPassword.module.scss";
import { ErrorMessage, Field, Formik } from "formik";
import { UserState } from "../../../../models/UserState";
import { changePasswordValidationSchema } from "../../../../utils/Validation";
import Button from "../../../../common/button";
import { USER_CHANGE_PASSWORD_URL } from "../../../../apiHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const token = sessionStorage.getItem('token')
  const navigate = useNavigate()

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: UserState) => {
    setMessage('')
    try {
        axios.put(USER_CHANGE_PASSWORD_URL,{
            ...values
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            setSuccess(true)
            setMessage(res.data.message)
            navigate('/user/setting')
        }).catch((error)=>{
            setSuccess(false)
            setMessage(error.response.data.message)
        })
    } catch (error) {
        console.log(error)
        setMessage('Something is Wrong!')
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
                name="oldPassword"
                type="password"
                placeholder="Old Password"
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
                name="newPassword"
                type="password"
                placeholder="New Password"
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
                name="confirmPassword"
                type="password"
                placeholder="New Password"
                id="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
            <div className={`${styles.submit}`}>
              {success ? (
                <h6 className={`${styles.message} success`}>{message}</h6>
               
              ) : (
                <h6 className={`${styles.message} error`}>{message}</h6>
              )}
           
              <Button className={`${styles.forgotBtn}`} value={"Continue"} />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;

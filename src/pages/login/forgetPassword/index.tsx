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
import Layout from "../../../layout/NavLayout";
import { Particle } from "../../../layout/particles";
import ToastView from "../../../components/Toast";

export const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values: UserState) => {
    const email = values.email?.toLowerCase();
    values.email = email;
    if (toast) {
      setToast(false);
    }
    try {
      await axios
        .put(FORGOT_PASSWORD_URL, {
          email: values.email,
        })
        .then((res) => {
          setSuccess(true);
          setToast(true);

          setMessage(res.data.email);
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
    <Layout>
      <Particle>
        <div className={`${styles.container} `}>
          <Formik<UserState>
            initialValues={initialValues}
            validationSchema={emailValidationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form
                className={` ${styles.form} `}
                onSubmit={formik.handleSubmit}
              >
                <h4 className="m-1">Reset Password</h4>
                <p className={` ${styles.para} m-2`}>
                  Enter Your email address and we will send you instructions to
                  reset your password.
                </p>
                <div className={`${styles.formContent}`}>
                  <label htmlFor="email">
                    Email
                    <span className="required-asterisk" aria-label="required">
                      *
                    </span>
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    id="email"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={`${styles.error} error`}
                  />
                </div>
                <div className={`${styles.submit}`}>
                  <Button
                    className={`${styles.forgotBtn}`}
                    value={"Continue"}
                  />
                </div>
              </Form>
            )}
          </Formik>
          {toast ? <ToastView message={message} success={success} setToast={setToast}/> : ""}
        </div>
      </Particle>
    </Layout>
  );
};

import { useState } from "react";
import axios from "axios";
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
import FormComponent from "../../../components/form";
import { RESET_PASSWORD_FIELDS } from "../../../constants/inputFields";
import { ErrorMessage, Field, Formik } from "formik";
import Button from "../../../common/button";

export const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const [toast, setToast] = useState(false);
  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values: UserState) => {
    setLoader(true);
    if (toast) {
      setToast(false);
    }
    try {
      await axios
        .put(FORGOT_PASSWORD_URL, {
          email: values.email,
        })
        .then((res) => {
          setLoader(false);
          setSuccess(true);
          setToast(true);
          console.log(res)
          setMessage(res.data.result.message);
        })
        .catch((error) => {
          setSuccess(false);
          setLoader(false);
          setToast(true);
          setMessage(error.response.data.message);
        });
    } catch (error) {
      setSuccess(false);
      setLoader(false);
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
              <form
                className={` ${styles.form} `}
                onSubmit={formik.handleSubmit}
              >
                <h4 className="m-1">Reset Password</h4>
                <p className={` ${styles.para} m-2`}>
                  Enter Your email address and we will send you instructions to
                  reset your password. :)
                </p>

                <div className={`${styles.formContent}`}>
                  <label htmlFor="email">
                    Email
                    <span className="required-asterisk" aria-label="required">
                      *
                    </span>
                  </label>
                  <Field
                    className="input"
                    name="email"
                    type="email"
                    id="email"
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
                    value={loader ? "Processing.." : "Continue"}
                  />
                </div>
              </form>
            )}
          </Formik>
          {toast ? (
            <ToastView
              message={message}
              success={success}
              setToast={setToast}
            />
          ) : (
            ""
          )}
        </div>
      </Particle>
    </Layout>
  );
};

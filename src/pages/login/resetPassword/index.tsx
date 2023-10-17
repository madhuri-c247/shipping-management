import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
//CSS
import styles from "./reset.module.scss";
//models
import { UserState } from "../../../models/UserState";
//common
import Button from "../../../common/button/index";
//apiHelper
import { RESET_PASSWORD_URL } from "../../../apiHelper";
//validations
import { resetValidationSchema } from "../../../utils/Validation";
import Layout from "../../../layout/NavLayout";
import { Particle } from "../../../layout/particles";
import ToastView from "../../../components/Toast";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const [loader, setLoader] = useState(false)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  console.log(searchParams, token);
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: UserState) => {
    setLoader(true)
    try {
      await axios
        .put(`${RESET_PASSWORD_URL}${token}`, {
          confirmPassword: values.confirmPassword,
          password: values.password,
        })
        .then((res) => {
          setLoader(false)
          const  message  = res.data.result.message;
          console.log(message)
          setToast(true);
          setSuccess(true);
          setMessage(message);
          navigate("/login", {
            state: {
              response: message,
            },
          });
        })
        .catch((error) => {
          setToast(true);
          setLoader(false)
          setSuccess(false);
          setMessage(error.response.data.error);
        });
    } catch (error) {
      setLoader(false)
      setMessage("Something is wrong!");
    }
  };

  return (
    <Layout>
      <Particle>
        <div className={`${styles.container}  `}>
          <Formik<UserState>
            initialValues={initialValues}
            validationSchema={resetValidationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form
                className={` ${styles.form} `}
                onSubmit={formik.handleSubmit}
              >
                <>
                  <h3 className="m-1">Reset Password</h3>
                  <div className={`${styles.formContent}`}>
                    <label htmlFor="createPassword">
                      Create Password
                      <span className="required-asterisk" aria-label="required">
                        *
                      </span>
                    </label>
                    <Field
                      name="password"
                      type="password"
                      id="createPassword"
                      placeholder="Create Password"
                    />
                    <ErrorMessage
                      name="password"
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
                      id="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>
                  <div className={`${styles.submit}`}>
                    <Button
                      value={loader?"Processing":"Reset password"}
                      className={`${styles.resetBtn}`}
                    />
                  </div>
                </>
              </Form>
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
export default Login;

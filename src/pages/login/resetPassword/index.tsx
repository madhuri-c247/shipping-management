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

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: UserState) => {
    try {
      await axios
        .put(`${RESET_PASSWORD_URL}${token}`, {
          confirmPassword: values.confirmPassword,
          password: values.password,
        })
        .then((res) => {
          navigate("/login");
        })
        .catch((error) => {
          setMessage(error.response.error);
        });
    } catch (error) {
      setMessage("Something is wrong!");
    }
  };

  return (
    <div className={`${styles.container}  `}>
      <Formik<UserState>
        initialValues={initialValues}
        validationSchema={resetValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className={` ${styles.form} `} onSubmit={formik.handleSubmit}>
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
                {message ? (
                  <h6 className={`${styles.message} error`}>
                    Sorry! {message}
                  </h6>
                ) : (
                  ""
                )}
                <Button
                  value="Reset password"
                  className={`${styles.resetBtn}`}
                />
              </div>
            </>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Login;

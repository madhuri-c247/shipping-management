import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
//CSS
import styles from "./login.module.scss";
//models
import { UserState } from "../../models/UserState";
//common
import Button from "../../common/button";
//layouts
import Layout from "../../layout/NavLayout";
import { Particle } from "../../layout/particles";
//validations
import { loginValidationSchema } from "../../utils/Validation";
//apiHelper
import { LOGIN_BASE_URL } from "../../apiHelper";

const Login: React.FC = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (token) {
      navigate("/user/quote/letter");
    }
  });

  const handleSubmit = async (values: UserState) => {
    axios
      .post(LOGIN_BASE_URL, values)
      .then((response) => {
        if (response.status === 200) {
          setMessage("");
          sessionStorage.setItem("token", response.data.token);
          navigate("/user/quote/letter");
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  const forgetPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <Layout>
      <Particle>
        <div className={`${styles.container}  `}>
          <Formik<UserState>
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form
                className={` ${styles.form} `}
                onSubmit={formik.handleSubmit}
              >
                <>
                  <h1 className="m-1">Login</h1>
                  <div className={`${styles.formContent}`}>
                    <label htmlFor="email">E-mail</label>
                    <Field name="email" type="email" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>

                  <div className={`${styles.formContent}`}>
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={`${styles.error} error`}
                    />
                    <button type="button" onClick={forgetPassword}>
                      Forget Password ?
                    </button>
                  </div>
                  <div className={`${styles.submit}`}>
                    {message ? (
                      <h6 className={`${styles.message} error`}>
                        Sorry! {message}
                      </h6>
                    ) : (
                      ""
                    )}
                    <Button value="Login" className="login-btn" />
                    <span>
                      Don't Have an account ?
                      <NavLink to={"/signup"}>Sign Up</NavLink>
                    </span>
                  </div>
                </>
              </Form>
            )}
          </Formik>
        </div>
      </Particle>
    </Layout>
  );
};
export default Login;

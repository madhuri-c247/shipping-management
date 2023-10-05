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
    try {
      axios
        .post(LOGIN_BASE_URL, values)
        .then((response) => {
          if (response.status === 200) {
            console.log(response,'response')
            setMessage("");
            sessionStorage.setItem("token", response.data.token);
            if(response.data.role==='admin'){
              navigate("/admin/saved-quotes");
            }else{
               navigate("/user/quote/letter");
            }
          }
        })
        .catch((err) => {
          console.log(err)
          setMessage(err.response.data.message);
        });
    } catch (error) {
      setMessage("something is wrong!");
    }
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
                    <label>
                      E-mail{" "}
                      <span className="required-asterisk" aria-label="required">
                        *
                      </span>
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>

                  <div className={`${styles.formContent}`}>
                    <label>
                      Password{" "}
                      <span className="required-asterisk" aria-label="required">
                        *
                      </span>
                    </label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={`${styles.error} error`}
                    />
                    <a type="button" onClick={forgetPassword}>
                      Forget Password ?
                    </a>
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

import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Form, Spinner } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
//CSS
import styles from "./signup.module.scss";
//assets
import signupBgImage from "../../assets/signupImage.jpg";
//models
import { UserState } from "../../models/UserState";
//common
import Button from "../../common/button";
//layouts
import Layout from "../../layout/NavLayout";
import { Particle } from "../../layout/particles";
//apiHelper
import { SIGNUP_BASE_URL } from "../../apiHelper";
//validationSchema
import { signupValidationSchema } from "../../utils/Validation";

const SignUp: React.FC = () => {
  const [message, setMessage] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [Successful, setSuccessful] = useState(false);
  const initialValues = {
    companyName: "",
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: UserState) => {
    try {
      await axios
      .post(SIGNUP_BASE_URL, values)
      .then((response) => {
        setSpinner(true);
        setInterval(() => {
          setSuccessful(true);
          setSpinner(false);
          setMessage(response.data.message);
          values.companyName = "";
          values.firstName = "";
          values.lastName = "";
          values.number = "";
          values.email = "";
          values.password = "";
          values.confirmPassword = "";
        }, 2000);
      })
      .catch((error) => {
        setSuccessful(false);
        setMessage(error.response.data.message);
      });
    } catch (error) {
      
      setSuccessful(false);
      setMessage("Something is Wrong");
    }
 
  };

  return (
    <Layout>
      <Particle>
        <div className={`${styles.container}  `}>
          <div className={`${styles.childContainer} d-flex-r`}>
            <div className={` ${styles.container1} `}>
              <img
                className={`${styles.image} `}
                src={signupBgImage}
                alt="group-of-people"
              />
              <div className={`${styles.content}`}>
                <h3>Get Started absolutely Free.</h3>
              </div>
            </div>
            <Formik<UserState>
              initialValues={initialValues}
              validationSchema={signupValidationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form
                  className={` ${styles.container2} `}
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="m-3">Sign Up</h1>
                  <div>
                    <div className={`${styles.formContent} w-100`}>
                      <label htmlFor="companyName">
                        Company Name
                        <span
                          className="required-asterisk"
                          aria-label="required"
                        >
                          *
                        </span>
                      </label>
                      <Field
                        id="companyName"
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                      />
                      <ErrorMessage
                        name="companyName"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                  </div>
                  <div className={`${styles.input}`}>
                    <div className={`${styles.formContent}`}>
                      <label htmlFor="firstName">
                        First Name
                        <span
                          className="required-asterisk"
                          aria-label="required"
                        >
                          *
                        </span>
                      </label>
                      <Field
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>

                    <div className={`${styles.formContent}`}>
                      <label htmlFor="lastName">
                        Last Name
                        <span
                          className="required-asterisk"
                          aria-label="required"
                        >
                          *
                        </span>
                      </label>
                      <Field
                        name="lastName"
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                  </div>
                  <div className={` ${styles.input}`}>
                    <div className={`${styles.formContent}`}>
                      <label htmlFor="phoneNumber">
                        Phone Number
                        <span
                          className="required-asterisk"
                          aria-label="required"
                        >
                          *
                        </span>
                      </label>
                      <Field
                        name="number"
                        id="phoneNumber"
                        type="tel"
                        placeholder="Phone Number"
                      />
                      <ErrorMessage
                        name="number"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>

                    <div className={`${styles.formContent}`}>
                      <label htmlFor="email">
                        E-mail Address
                        <span
                          className="required-asterisk"
                          aria-label="required"
                        >
                          *
                        </span>
                      </label>
                      <Field
                        name="email"
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        autoComplete="off"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                  </div>
                  <div className={`  ${styles.input}`}>
                    <div className={`${styles.formContent}`}>
                      <label htmlFor="password">
                        Password
                        <span
                          className="required-asterisk"
                          aria-label="required"
                        >
                          *
                        </span>
                      </label>
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        id="password"
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
                        <span
                          className="required-asterisk"
                          aria-label="required"
                        >
                          *
                        </span>
                      </label>
                      <Field
                        name="confirmPassword"
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                  </div>
                  {Successful ? (
                    <h6 className={`${styles.message} success m-1`}>
                      {message}
                    </h6>
                  ) : (
                    <h6 className={`${styles.message} error m-1`}>{message}</h6>
                  )}
                  <div className={`${styles.submit}`}>
                    {spinner ? (
                      <span className={`spinner m-1`}>
                        <Spinner animation="border" variant="dark" />
                      </span>
                    ) : (
                      ""
                    )}

                    <Button className="signup-btn" value="SIGN UP" />
                    <span>
                      Already Have an Account ?{" "}
                      <NavLink to={"/login"}>Login</NavLink>
                    </span>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Particle>
    </Layout>
  );
};
export default SignUp;

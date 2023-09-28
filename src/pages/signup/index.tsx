import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Form, Spinner, Toast } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
//react-icons
import { IoMdCheckmarkCircle } from "react-icons/io";
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
    await axios
      .post(SIGNUP_BASE_URL, values)
      .then((response) => {
        if (response.status === 200) {
          setSpinner(true);
          setInterval(() => {
            setSuccessful(true);
            setSpinner(false);
          }, 4000);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  return (
    <Layout>
      <Particle>
        <div className={`${styles.container}  `}>
          <div className={`${styles.childContainer} d-flex-r`}>
            <div className={` ${styles.container1} `}>
              <img
                className={`${styles.image}`}
                src={signupBgImage}
                alt="group-of-people"
              />
              <div className={`${styles.content}`}>
                <h3>Get Started absolutely Free.</h3>
                <span className={`d-flex-r `}>
                  <IoMdCheckmarkCircle />
                  Instant Pricing for LTL and small packages
                </span>
                <span className={`d-flex-r `}>
                  <IoMdCheckmarkCircle />
                  Instant Pricing for LTL and small packages
                </span>
                <span className={`d-flex-r `}>
                  <IoMdCheckmarkCircle />
                  Instant Pricing for LTL and small packages
                </span>
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
                    <div className={`${styles.formContent}`}>
                      <label>Company Name</label>
                      <Field type="text" name="companyName" />
                      <ErrorMessage
                        name="companyName"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                  </div>
                  <div className={`${styles.input}`}>
                    <div className={`${styles.formContent}`}>
                      <label>First Name</label>
                      <Field name="firstName" type="text" />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>

                    <div className={`${styles.formContent}`}>
                      <label>Last Name</label>
                      <Field name="lastName" type="text" />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                  </div>
                  <div className={` ${styles.input}`}>
                    <div className={`${styles.formContent}`}>
                      <label>Number</label>
                      <Field name="number" type="tel" />
                      <ErrorMessage
                        name="number"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>

                    <div className={`${styles.formContent}`}>
                      <label>E-mail Address</label>
                      <Field name="email" type="email" />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                  </div>
                  <div className={`  ${styles.input}`}>
                    <div className={`${styles.formContent}`}>
                      <label>Password</label>
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
                    </div>
                  </div>
                  {message ? (
                    <h6 className={`${styles.message} error m-1`}>{message}</h6>
                  ) : (
                    ""
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
          {Successful ? (
            <Toast
              bg={"Success".toLowerCase()}
              className={`${styles.toast} d-inline-block m-1`}
            >
              <Toast.Body>
                Account Created, Please Verify Your email !!
              </Toast.Body>
            </Toast>
          ) : (
            ""
          )}
        </div>
      </Particle>
    </Layout>
  );
};
export default SignUp;

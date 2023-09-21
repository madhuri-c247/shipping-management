import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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


const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const initialValues = {
    companyName: "",
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Company Name is required"),
    firstName: Yup.string()
      .required("First Name is required")
      .matches(
        /^[A-Za-z]+$/,
        "First Name must contain only alphabetic characters"
      ),
    lastName: Yup.string()
      .required("Last Name is required")
      .matches(
        /^[A-Za-z]+$/,
        "First Name must contain only alphabetic characters"
      ),
    number: Yup.string()
      .min(10, "Number must be greater than or equal to 10")
      .required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol, and be at least 8-16 characters long"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: UserState) => {
    try {
      const response = await axios.post(SIGNUP_BASE_URL, values);
      console.log(response.status);
      console.log(response.data.error, "error");
      if (response.status === 200) {
        navigate("/login");
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {}
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
              validationSchema={validationSchema}
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
                  {message ? message : ""}
                  <div className={`${styles.submit}`}>
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

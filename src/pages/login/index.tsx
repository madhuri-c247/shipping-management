import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import {useState} from 'react';
import * as Yup from "yup";
//CSS
import styles from "./login.module.scss";
//models
import { UserState } from "../../models/UserState";
//common
import Button from "../../common/button";
//layouts
import Layout from "../../layout/NavLayout";
import { Particle } from "../../layout/particles";
//store
import { AppDispatch } from "../../redux/store";
//apiHelper
import { LOGIN_BASE_URL } from "../../apiHelper";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('')
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol, and be at least 8-16 characters long"
      ),
  });

  const handleSubmit = async (values: UserState) => {
    try {
      const response = await axios.post(LOGIN_BASE_URL, values);
      setMessage(response.data)
      console.log(response.data,'response')
      if (response.status === 200) {
        navigate("/user/quote");
      }else{
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const forgotPassword = () => {
    // alert("forgot");
  };

  return (
    <Layout>
      <Particle>
        <div className={`${styles.container}  `}>
          <Formik<UserState>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form
                className={` ${styles.form} `}
                onSubmit={formik.handleSubmit}
              >
                <h1 className="m-1">Login</h1>
                <div className={`${styles.formContent}`}>
                  <label>E-mail</label>
                  <Field name="email" type="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={`${styles.error} error`}
                  />
                </div>

                <div className={`${styles.formContent}`}>
                  <label>Password</label>
                  <Field name="password" type="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={`${styles.error} error`}
                  />
                  <button onClick={forgotPassword}>Forget Password ?</button>{" "}
                  <br />
                </div>
                {message? message:'not'}
                <div className={`${styles.submit}`}>
                  <Button value="Login" className="login-btn" />
                  <span>
                    Don't Have an account ?
                    <NavLink to={"/signup"}>Sign Up</NavLink>
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Particle>
    </Layout>
  );
};
export default Login;

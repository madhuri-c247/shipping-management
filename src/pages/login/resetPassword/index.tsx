import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import * as Yup from "yup";
//CSS
import styles from "../login.module.scss";
//models
import { UserState } from "../../../models/UserState";
//common
import Button from "../../../common/button/index";
// //layouts
// import Layout from "../../layout/NavLayout";
// import { Particle } from "../../layout/particles";
//store
import { AppDispatch } from "../../../redux/store";
//reducer
import { handleLogin, handleReset } from "../../../redux/reducers/userReducer/index";
import { RESET_PASSWORD_URL } from "../../../apiHelper";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const [forgot, setPassword] = useState(false);

  const initialValues = { 
    password: "",
    confirmPassword:""
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const validationSchema = Yup.object().shape({
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
    const url = RESET_PASSWORD_URL
    
    console.log(token)
    const reset = dispatch(handleReset({values, token, url}));
    if (reset) {

    } else {
    }
  };

  return (
    
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
                <>
                  <h3 className="m-1">Reset Password</h3>
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
                  <div className={`${styles.submit}`}>
                    {message ? (
                      <h6 className={`${styles.message} error`}>
                        Sorry! {message}
                      </h6>
                    ) : (
                      ""
                    )}
                    <Button value="Reset" className="login-btn" />
                    
                  </div>
                </>
              </Form>
            )}
          </Formik>
        </div>
 
  );
};
export default Login;

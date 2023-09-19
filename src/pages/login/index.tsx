import { ChangeEvent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
//CSS
import styles from "./login.module.scss";
//models
import { UserState } from "../../models/UserState";
//common
import Button from "../../common/button";
//layouts
import Layout from "../../NavLayout";
import { Particle } from "../../particles";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserState>({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/user/quote");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const forgotPassword = () => {
    alert("forgot");
  };

  useEffect(() => {}, [user]);
  return (
    <Layout>
      <Particle>
        <div className={`${styles.container}  `}>
          <Form className={` ${styles.form} `} onSubmit={handleSubmit}>
            <h1 className="m-1">Login</h1>

            <div className={`${styles.formContent}`}>
              <label>E-mail</label>
              <input
                name="email"
                onChange={handleChange}
                value={user.email}
                type="email"
                required
              />
            </div>

            <div className={`${styles.formContent}`}>
              <label>Password</label>
              <input
                name="password"
                onChange={handleChange}
                value={user.password}
                type="password"
                required
              />
              <button onClick={forgotPassword}>Forget Password ?</button> <br />
            </div>

            <div className={`${styles.submit}`}>
              <Button value="Login" className="login-btn" />
              <span>
                Don't Have an account ?<NavLink to={"/signup"}>Sign Up</NavLink>
              </span>
            </div>
          </Form>
        </div>
      </Particle>
    </Layout>
  );
};
export default Login;

import { ChangeEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";
//CSS
import styles from "./login.module.scss";
//models
import { UserState } from "../../models/userState";
//common
import Button from "../../common/button";

const Login: React.FC = () => {
  const [user, setUser] = useState<UserState>({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    <div className={`${styles.container}  `}>
      <Form className={` ${styles.form} `} onSubmit={handleSubmit}>
        <h1 className="m-3">Login</h1>

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
            Don't Have an account ? <NavLink to={"/signup"}>Sign Up</NavLink>
          </span>
        </div>
      </Form>
    </div>
  );
};
export default Login;

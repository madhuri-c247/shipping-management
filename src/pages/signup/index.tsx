import { ChangeEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Form } from "react-bootstrap";
//CSS
import styles from "./signup.module.scss";
//assets
import signupBgImage from "../../assets/signupImage.jpg";
//models
import { UserState } from "../../models/user";
//constants
import { emailPattern, phoneNumber } from "../../utils/constants";
//common
import Button from "../../common/button";

const SignUp: React.FC = () => {
  const [user, setUser] = useState<UserState>({
    companyName: "",
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      user.companyName !== "" &&
      user.firstName !== "" &&
      user.lastName !== "" &&
      user.number !== "" &&
      user.email !== "" &&
      user.password !== "" &&
      user.confirmPassword !== ""
    ) {
      if (emailPattern.test(user.email)) {
        if (
          user.number !== undefined &&
          user.number.length >= 10 &&
          user.number.length <= 15 &&
          phoneNumber.test(user.number)
        ) {
          if (user.password === user.confirmPassword) {
            alert("submitted successfully");
          } else {
            alert("password do not match");
          }
        } else {
          alert("invalid number");
        }
      } else {
        alert("invalid email");
      }
    } else {
      alert("fields can't be empty");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {}, [user]);
  return (
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
        <Form className={` ${styles.container2} `} onSubmit={handleSubmit}>
          <h1 className="m-3">Sign Up</h1>
          <div>
            <div className={`${styles.formContent}`}>
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                onChange={handleChange}
                value={user.companyName}
              />
            </div>
          </div>
          <div className={`${styles.input}`}>
            <div className={`${styles.formContent}`}>
              <label>First Name</label>
              <input
                name="firstName"
                onChange={handleChange}
                value={user.firstName}
                type="text"
              />
            </div>
            <div className={`${styles.formContent}`}>
              <label>Last Name</label>
              <input
                name="lastName"
                onChange={handleChange}
                value={user.lastName}
                type="text"
              />
            </div>
          </div>
          <div className={` ${styles.input}`}>
            <div className={`${styles.formContent}`}>
              <label>Phone Number</label>
              <input
                name="number"
                onChange={handleChange}
                value={user.number}
                type="tel"
              />
            </div>
            <div className={`${styles.formContent}`}>
              <label>E-mail Address</label>
              <input
                name="email"
                onChange={handleChange}
                value={user.email}
                type="email"
              />
            </div>
          </div>
          <div className={`  ${styles.input}`}>
            <div className={`${styles.formContent}`}>
              <label>Password</label>
              <input
                name="password"
                onChange={handleChange}
                value={user.password}
                type="password"
              />
            </div>
            <div className={`${styles.formContent}`}>
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                onChange={handleChange}
                value={user.confirmPassword}
                type="password"
              />
            </div>
          </div>
          <div className={`${styles.submit}`}>
            <Button className="signup-btn" value="SIGN UP" />
            <span>
              Already Have an Account ? <NavLink to={"/login"}>Login</NavLink>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default SignUp;

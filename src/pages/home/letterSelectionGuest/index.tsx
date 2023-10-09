import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
//css
import styles from "./letterSelectionGuest.module.scss";
//common
import Button from "../../../common/button/index";
//models
import { GuestState } from "../../../models/GuestState";
//apiHelper
import { GUEST_PACKAGE_QUOTE_URL } from "../../../apiHelper";
//validations
import { GuestLetterValidationSchema } from "../../../utils/Validation";

export const LetterSelectionGuest = () => {
  const [Successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const initialValues = {
    fromCity: "",
    toCity: "",
    name: "",
    phone: "",
    email: "",
  };

  const handleSubmit = async (values: GuestState) => {
    setMessage('')
    try {
      await axios
        .post(GUEST_PACKAGE_QUOTE_URL, {
          ...values,
        })
        .then((res) => {
          setSuccessful(true);
          setMessage(res.data.message);
          values.fromCity = "";
          values.toCity = "";
          values.name = "";
          values.phone = "";
          values.email = "";
        })
        .catch((error) => {
          setSuccessful(false);
          setMessage("Something is Wrong!" + error);
        });
    } catch (error) {
      setSuccessful(false);
      setMessage("Something is wrong!");
    }
  };

  return (
    <Formik<GuestState>
      initialValues={initialValues}
      validationSchema={GuestLetterValidationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className={`${styles.container}`}>
          <div className={`${styles.content}`}>
            <div className={`${styles.innerContent}`}>
              <label htmlFor="fromCity">
                From City
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>

              <Field
                className={`${styles.input} input`}
                type="text"
                name="fromCity"
                placeholder="From City"
                id="fromCity"
              />
              <ErrorMessage
                name="fromCity"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
          </div>
          <div className={`${styles.content}`}>
            <div className={`${styles.innerContent}`}>
              <label htmlFor="toCity">
                To City
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>

              <Field
                type="text"
                className={`${styles.input} input`}
                name="toCity"
                placeholder="To City"
                id="toCity"
              />
              <ErrorMessage
                name="toCity"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
          </div>
          <div
            role="group"
            aria-labelledby="contact"
            className={`${styles.contactContainer} `}
          >
            <label id="contact">
              Contact Information
              <span className="required-asterisk" aria-label="required">
                *
              </span>
            </label>
            <div className={`${styles.contactContent} d-flex-r`}>
              <div className={`${styles.inputContainer}`}>
                <Field
                  className={`${styles.contactInput} input`}
                  type="text"
                  name="name"
                  placeholder="Name"
                  id="name"
                  autoComplete="off"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={`${styles.error} error`}
                />
              </div>
              <div className={`${styles.inputContainer}`}>
                <Field
                  className={`${styles.contactInput} input`}
                  type="number"
                  name="phone"
                  placeholder="Phone Number"
                  id="phoneNumber"
                  autoComplete="off"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={`${styles.error} error`}
                />
              </div>
              <div className={`${styles.inputContainer}`}>
                <Field
                  className={`${styles.contactInput} input`}
                  type="text"
                  name="email"
                  placeholder="Email"
                  id="email"
                  autoComplete="off"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={`${styles.error} error`}
                />
              </div>
            </div>
          </div>
          <Button className={styles.homeSelectionButton} value="get Quote" />
          {Successful ? (
            <h5 className="success">{message}</h5>
          ) : (
            <h5 className="error">{message}</h5>
          )}
        </form>
      )}
    </Formik>
  );
};

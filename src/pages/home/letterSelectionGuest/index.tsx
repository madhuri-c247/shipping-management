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
  const [message, setMessage] = useState("");

  const initialValues = {
    fromCity: "",
    toCity: "",
    name: "",
    phone: "",
    email: "",
  };

  const handleSubmit = async (values: GuestState) => {
    axios
      .post(GUEST_PACKAGE_QUOTE_URL, {
        ...values,
      })
      .then((res) => {
        setMessage(res.data.message);
        values.fromCity = "";
        values.toCity = "";
        values.name = "";
        values.phone = "";
        values.email = "";
      })
      .catch((error) => {
        setMessage("Something is Wrong!" + error);
      });
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
            <label>
              From City{" "}
              <span className="required-asterisk" aria-label="required">
                *
              </span>
            </label>
            <Field
              className={`${styles.input}`}
              type="text"
              name="fromCity"
              placeholder="From City"
            />
            <ErrorMessage
              name="fromCity"
              component="div"
              className={`${styles.error} error`}
            />
          </div>
          <div className={`${styles.content}`}>
            <label>
              {" "}
              To City{" "}
              <span className="required-asterisk" aria-label="required">
                *
              </span>
            </label>
            <Field
              type="text"
              className={`${styles.input}`}
              name="toCity"
              placeholder="To City"
            />
            <ErrorMessage
              name="toCity"
              component="div"
              className={`${styles.error} error`}
            />
          </div>
          <div className={`${styles.contactContainer} `}>
            <label>
              Contact Information{" "}
              <span className="required-asterisk" aria-label="required">
                *
              </span>
            </label>
            <div className={`${styles.contactContent} d-flex-r`}>
              <div>
                <Field
                  className={`${styles.contactInput}`}
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={`${styles.error} error`}
                />
              </div>
              <div>
                <Field
                  className={`${styles.contactInput}`}
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={`${styles.error} error`}
                />
              </div>
              <div>
                <Field
                  className={`${styles.contactInput}`}
                  type="text"
                  name="email"
                  placeholder="Email"
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
          {message ? <h5 className="success">{message}</h5> : ""}
        </form>
      )}
    </Formik>
  );
};

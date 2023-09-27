import { ChangeEvent, useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
//css
import styles from "./letter.module.scss";
//common
import Button from "../../../../common/button";
//apiHelper
import { POSTAL_URL } from "../../../../apiHelper";
//models
import { QuoteState } from "../../../../models/QuotesState";
// store
import { AppDispatch } from "../../../../redux/store";
//reducers
import { AddLetter } from "../../../../redux/reducers/quoteReducer/letterQuoteReducer";
//validations
import { letterValidationSchema } from "../../../../utils/Validation";

const Letter = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const token = sessionStorage.getItem("token");
  const initialValues = {
    weight: 1,
    unit: "",
    insuranceAmount: 0,
    currency: "",
    agreeTerms: false,
  };
  const [postalCheck, setPostalCheck] = useState("");

  const [postalFrom, setPostalFrom] = useState({
    fromPostal: "",
    fromCity: "",
    fromProvince: "",
    fromCountry: "",
  });

  const [postalTo, setPostalTo] = useState({
    toPostal: "",
    toCity: "",
    toProvince: "",
    toCountry: "",
  });

  const [postalFromError, setPostalFromError] = useState("");
  const [postalToError, setPostalToError] = useState("");

  const handleSubmit = (values: any) => {
    console.log("submitted");
    const addLetter = dispatch(
      AddLetter({ values, postalFrom, postalTo, token })
    );
  };

  const handlePostalFrom = async () => {
    await axios
      .post(POSTAL_URL, {
        code: postalFrom.fromPostal,
      })
      .then((res) => {
        const { city, country, province } = res.data;
        setPostalFromError("");
        setPostalFrom((prevState) => ({
          ...prevState,
          fromCity: city,
          fromCountry: country,
          fromProvince: province,
        }));
      })
      .catch((err) => {
        const message = err.response.data.error;
        setPostalFromError(message);
        setPostalFrom((prevState) => ({
          ...prevState,
          fromCity: "",
          fromCountry: "",
          fromProvince: "",
        }));
      });
  };
  const handlePostalTo = async () => {
    await axios
      .post(POSTAL_URL, {
        code: postalTo.toPostal,
      })
      .then((res) => {
        const { city, country, province } = res.data;
        setPostalToError("");
        setPostalTo((prevState) => ({
          ...prevState,
          toCity: city,
          toCountry: country,
          toProvince: province,
        }));
      })
      .catch((err) => {
        const message = err.response.data.error;
        setPostalToError(message);
        setPostalTo((prevState) => ({
          ...prevState,
          toCity: "",
          toCountry: "",
          toProvince: "",
        }));
      });
  };

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
    postalCheck: string
  ): void {
    const { name, value } = event.target;
    if (postalCheck === "fromPostal") {
      setPostalCheck("from");
      setPostalFrom((postalFrom) => ({
        ...postalFrom,
        [name]: value,
      }));
    } else {
      setPostalCheck("to");
      setPostalTo((postalTo) => ({
        ...postalTo,
        [name]: value,
      }));
    }
  }

  useEffect(() => {
    if (postalCheck === "from") {
      handlePostalFrom();
    } else if (postalCheck === "to") {
      handlePostalTo();
    }
  }, [postalFrom.fromPostal, postalTo.toPostal]);

  return (
    <Formik<QuoteState>
      initialValues={initialValues}
      validationSchema={letterValidationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className={`${styles.form} form `} onSubmit={formik.handleSubmit}>
          <div className={`${styles.container} d-flex-r`}>
            <div className={`${styles.innerContainer} d-flex-col w-50 `}>
              <div className={`${styles.fromDiv} `}>
                <h6>Shipping From</h6>
                {postalFromError ? (
                  <h6 className="error">{postalFromError}</h6>
                ) : (
                  ""
                )}
                <div className="d-flex-col">
                  <input
                    type="number"
                    name="fromPostal"
                    placeholder="Postal Code"
                    value={postalFrom.fromPostal}
                    onChange={(e) => handleChange(e, "fromPostal")}
                  />
                </div>
                <div className={`${styles.portalContent}  d-flex-r`}>
                  <div className="d-flex-col">
                    <Field
                      type="text"
                      name="fromCity"
                      placeholder="city"
                      value={postalFrom.fromCity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex-col">
                    <Field
                      type="text"
                      name="fromProvince"
                      onChange={handleChange}
                      value={postalFrom.fromProvince}
                      placeholder="Province"
                    />
                  </div>
                  <div className="d-flex-col">
                    <Field
                      type="text"
                      name="fromCountry"
                      placeholder="Country"
                      value={postalFrom.fromCountry}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="country"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h6>Package Details</h6>
                <div className="d-flex-r">
                  <div className="d-flex-col">
                    <label htmlFor="">Weight</label>
                    <Field name="weight" type="number" />
                    <ErrorMessage
                      name="weight"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>
                  <div className="d-flex-col">
                    <label htmlFor="">Unit</label>
                    <select name="unit" id="" value={""}>
                      <option value="kg">kg</option>
                      <option value="LBS">LBS</option>
                      <option value="kg">kg</option>
                      <option value="kg">kg</option>
                    </select>
                    <ErrorMessage
                      name="unit"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={`${styles.innerContainer} d-flex-col w-100`}>
                <div className={`${styles.fromDiv} `}>
                  <h6>Shipping To</h6>
                  {postalToError ? (
                    <h6 className="error">{postalToError}</h6>
                  ) : (
                    ""
                  )}
                  <div className="d-flex-col">
                    <input
                      type="number"
                      name="toPostal"
                      placeholder=" Postal Code"
                      value={postalTo.toPostal}
                      onChange={(e) => handleChange(e, "toPostal")}
                    />
                  </div>
                  <div className={`${styles.portalContent}  d-flex-r`}>
                    <div className="d-flex-col">
                      <Field
                        type="text"
                        name="toCity"
                        placeholder="city"
                        value={postalTo.toCity}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex-col">
                      <Field
                        type="text"
                        name="toProvince"
                        placeholder="Province"
                        value={postalTo.toProvince}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex-col">
                      <Field
                        type="text"
                        name="toCountry"
                        placeholder="Country"
                        value={postalTo.toCountry}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="d-flex-r">
                    <div>
                      <label htmlFor="">Insurance</label>
                      <Field
                        type="number"
                        name="insuranceAmount"
                        placeholder="Enter Amount"
                      />
                      <ErrorMessage
                        name="insuranceAmount"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Currency</label>
                      <select name="currency" id="">
                        <option value="CAD">CAD</option>
                        <option value="LBS">LBS</option>
                        <option value="kg">kg</option>
                        <option value="kg">kg</option>
                      </select>
                      <ErrorMessage
                        name="currency"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                    <div className="d-flex-r">
                      <Field type="checkbox" name="agreeTerms" />

                      <span className="d-flex-col">
                        <label htmlFor="">I have read and agree with the</label>
                        <NavLink to={""}> terms and conditions</NavLink>
                        <ErrorMessage
                          name="agreeTerms"
                          component="div"
                          className={`${styles.error} error`}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button className={`${styles.submitBtn}`} value="Get Quote" />
        </Form>
      )}
    </Formik>
  );
};

export default Letter;

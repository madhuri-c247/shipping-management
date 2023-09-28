import { ChangeEvent, useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
//css
import styles from "../letter/letter.module.scss";
//common
import Button from "../../../../common/button";
//apiHelper
import { POSTAL_URL } from "../../../../apiHelper";
//models
import { QuoteState } from "../../../../models/QuotesState";
// store
import { AppDispatch } from "../../../../redux/store";
//reducers
import { AddLetter, AddPackage } from "../../../../redux/reducers/quoteReducer/letterQuoteReducer";
//validations
import { letterValidationSchema } from "../../../../utils/Validation";

const Package = () => {
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
    const addPackage = dispatch(
      AddPackage({ values, postalFrom, postalTo, token })
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
          <div className={`${styles.container} m-2 d-flex-r`}>
            <div className={`${styles.innerContainer} d-flex-col w-50 `}>
              <div className={`${styles.fromDiv} d-flex-col `}>
                <h6 className="mb-3">Shipping From</h6>
                {postalFromError ? (
                  <h6 className="error">{postalFromError}</h6>
                ) : (
                  ""
                )}
                <div className="d-flex-col">
                  <input
                    className="w-100"
                    type="number"
                    name="fromPostal"
                    placeholder="Postal Code"
                    value={postalFrom.fromPostal}
                    onChange={(e) => handleChange(e, "fromPostal")}
                  />
                </div>
                <div className={`${styles.portalContent}  d-flex-r`}>

                  <Field
                    type="text"
                    name="fromCity"

                    placeholder="city"
                    value={postalFrom.fromCity}
                    onChange={handleChange}
                  />

                  <Field
                    type="text"
                    name="fromProvince"

                    onChange={handleChange}
                    value={postalFrom.fromProvince}
                    placeholder="Province"
                  />

                  <Field
                    type="text"
                    name="fromCountry"

                    placeholder="Country"
                    value={postalFrom.fromCountry}
                    onChange={handleChange}
                  />

                </div>
              </div>
              <div className={`${styles.packageContainer} `}>
                <h6 >Package Details</h6>
                <div className={`${styles.innerPackage}  d-flex-r`}>
                  <div className={`w-50 d-flex-col`}>
                    <label  >Weight</label>
                    <Field className="w-100" name="weight" type="number" />
                    <ErrorMessage
                      name="weight"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>
                  <div className={`${styles.unitDiv}  d-flex-col`}>
                    <label >Measurement</label>
                    <select className={`w-100 d-flex-col`} name="unit" id="" >
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
                  <div className={`${styles.unitDiv}  d-flex-col`}>
                    <label >Unit</label>
                    <select className={`w-100 d-flex-col`} name="unit" id="" >
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
                <div className={`${styles.fromDiv} d-flex-col`}>

                  <h6 className="mb-3"> Shipping To</h6>
                  {postalToError ? (
                    <h6 className="error">{postalToError}</h6>
                  ) : (
                    ""
                  )}
                  <div className="d-flex-col">
                    <input
                      className="w-100"
                      type="number"
                      name="toPostal"
                      placeholder=" Postal Code"
                      value={postalTo.toPostal}
                      onChange={(e) => handleChange(e, "toPostal")}
                    />
                  </div>
                  <div className={`${styles.portalContent}   d-flex-r`}>

                    <Field
                      type="text"
                      name="toCity"
                      placeholder="city"
                      value={postalTo.toCity}
                      onChange={handleChange}
                    />

                    <Field
                      type="text"
                      name="toProvince"
                      placeholder="Province"
                      value={postalTo.toProvince}
                      onChange={handleChange}
                    />

                    <Field
                      type="text"
                      name="toCountry"
                      placeholder="Country"
                      value={postalTo.toCountry}
                      onChange={handleChange}
                    />

                  </div>
                </div>
                <div>
                  <div className={`${styles.insuranceContainer}  d-flex-r`}>
                    <div className={`${styles.currency} w-25  d-flex-col`}>
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
                    <div className={`${styles.currency} w-25  d-flex-col`}>
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
                    <div className={`${styles.currency, styles.checkbox} mt-4  d-flex-r`}>
                      <Field className={`${styles.check} m-2`} type="checkbox" name="agreeTerms" />

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
            <Button className={`${styles.submitBtn}`} value="Get Quote" />
          </div>

        </Form>
      )}
    </Formik>
  );
};

export default Package;

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

  const initialValues = {
    fromCity: "",
    fromProvince: "",
    fromCountry: "",
    weight: 1,
    unit: "",
    toCity: "",
    toProvince: "",
    toCountry: "",
    insuranceAmount: 0,
    currency: "",
    agreeTerms: false,
  };
  const [postalCode, setPostalCode] = useState({
    fromPostalCode: "",
    toPostalCode: "",
  });

  const handleSubmit = (values: any) => {
    const addLetter = dispatch(AddLetter({ values, postalCode }));
    if (addLetter) {
    } else {
    }
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setPostalCode({
      ...postalCode,
      [name]: value,
    });
    console.log(postalCode);
    console.log(name);
    console.log(postalCode[name as keyof typeof postalCode]);
    axios
      .post(POSTAL_URL, {
        code: postalCode[name as keyof typeof postalCode],
      })
      .then((res) => {
        console.log(res);
      });
  }

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
                <div className="d-flex-col">
                  <input
                    type="number"
                    name="fromPostalCode"
                    placeholder="Postal Code"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="fromPostalCode"
                    component="div"
                    className={`${styles.error} error`}
                  />
                </div>
                <div className={`${styles.portalContent}  d-flex-r`}>
                  <div className="d-flex-col">
                    <Field type="text" name="fromCity" placeholder="city" />
                    <ErrorMessage
                      name="fromCity"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>
                  <div className="d-flex-col">
                    <Field
                      type="text"
                      name="fromProvince"
                      placeholder="Province"
                    />
                    <ErrorMessage
                      name="fromProvince"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>
                  <div className="d-flex-col">
                    <Field
                      type="text"
                      name="fromCountry"
                      placeholder="Country"
                    />
                    <ErrorMessage
                      name="fromCountry"
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
                    <select name="unit" id="">
                      <option value="">kg</option>
                      <option value="">LBS</option>
                      <option value="">kg</option>
                      <option value="">kg</option>
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
                  <div className="d-flex-col">
                    <input
                      type="number"
                      name=" toPostalCode"
                      placeholder=" Postal Code"
                      onChange={handleChange}
                    />

                    <ErrorMessage
                      name="toPostalCode"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>
                  <div className={`${styles.portalContent}  d-flex-r`}>
                    <div className="d-flex-col">
                      <Field type="text" name="toCity" placeholder="city" />
                      <ErrorMessage
                        name="toCity"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                    <div className="d-flex-col">
                      <Field
                        type="text"
                        name="toProvince"
                        placeholder="Province"
                      />
                      <ErrorMessage
                        name="toProvince"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                    <div className="d-flex-col">
                      <Field
                        type="text"
                        name="toCountry"
                        placeholder="Country"
                      />
                      <ErrorMessage
                        name="toCountry"
                        component="div"
                        className={`${styles.error} error`}
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
                        <option value="">CAD</option>
                        <option value="">LBS</option>
                        <option value="">kg</option>
                        <option value="">kg</option>
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

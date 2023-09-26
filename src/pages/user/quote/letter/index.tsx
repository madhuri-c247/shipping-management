import React from "react";
import styles from "./letter.module.scss";
import { NavLink } from "react-router-dom";
import Button from "../../../../common/button";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { QuoteState } from "../../../../models/QuotesState";

const Letter = () => {
  const handleSubmit = (values:any) => {
    console.log(values); // Access form values here
 
  };

  const validationSchema = Yup.object().shape({
    fromCity: Yup.string().required('City is required'),
  fromProvince: Yup.string().required('Province is required'),
  fromCountry: Yup.string().required('Country is required'),
  packageWeight: Yup.number().required('Weight is required').positive('Weight must be positive').min(0.1, 'Weight must be at least 0.1').max(1000, 'Weight cannot exceed 1000'),
  packageUnit: Yup.string().required('Unit is required'),
  toCity: Yup.string().required('City is required'),
  toProvince: Yup.string().required('Province is required'),
  toCountry: Yup.string().required('Country is required'),
  insuranceAmount: Yup.number().typeError('Insurance Amount must be a number').positive('Insurance Amount must be positive').min(0, 'Insurance Amount cannot be negative'),
  currency: Yup.string().required('Currency is required'),
  agreeTerms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),

  });

  const initialValues = {
    
      fromCity: "",
      fromProvince: "",
      fromCountry: "",
      packageWeight: 1,
      packageUnit: "",
      toCity: "",
      toProvince: "",
      toCountry: "",
      insuranceAmount: 0,
      currency: "",
      agreeTerms: false
    
  }
  return (
    <Formik<QuoteState>
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
      {(formik) => (
    <Form className={`${styles.form} form `} onSubmit={handleSubmit}>
      <div className= {`${styles.container} d-flex-r`}>
        <div className={`${styles.innerContainer} d-flex-col w-50 `}>      
        <div className={`${styles.fromDiv} `}>
          <h6>Shipping From</h6>
          <input type="text" placeholder="Search City/ Postal Code"/>
          <div className={`${styles.portalContent}  d-flex-r`}>
            <input type="text" placeholder="city"  />
            <input type="text" placeholder="Province" />
            <input type="text" placeholder="Country" />
          </div>          
        </div>
        <div>
          <h6>Package Details</h6>
          <div className="d-flex-r">
            <div className="d-flex-col">
              <label htmlFor="">Weight</label>
              <input type="number" />
            </div>
            <div className="d-flex-col">
              <label htmlFor="">Unit</label>
              <select name="" id="">
                <option value="">kg</option>
                <option value="">LBS</option>
                <option value="">kg</option>
                <option value="">kg</option>
              </select>
            </div>
          </div>
        </div>
        </div>
        <div>
    
        <div className={`${styles.innerContainer} d-flex-col w-100`}>
        <div className={`${styles.fromDiv} `}>
          <h6>Shipping To</h6>
          <input type="text" placeholder="Search City/ Postal Code"/>
          <div className={`${styles.portalContent}  d-flex-r`}>
            <input type="text" placeholder="city" />
            <input type="text" placeholder="Province" />
            <input type="text" placeholder="Country" />
          </div>          
        </div>
        <div>
          <div className="d-flex-r" >
            <div>
              <label htmlFor="">Insurance</label>
              <input type="text" placeholder="Enter Amount"/>
            </div>
            <div>
              <label htmlFor="">Currency</label>
              <select name="" id="">
                <option value="">CAD</option>
                <option value="">LBS</option>
                <option value="">kg</option>
                <option value="">kg</option>
              </select>
            </div>
            <div className="d-flex-r">
            <input type="checkbox"/>
            <span className="d-flex-col">
              <label htmlFor="">I have read and agree with the</label>
              <NavLink to={''}> terms and conditions</NavLink>
            </span>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
        <Button className= {`${styles.submitBtn}`} value='Get Quote'/>
    </Form>
      )}
    </Formik>
  );
};

export default Letter;

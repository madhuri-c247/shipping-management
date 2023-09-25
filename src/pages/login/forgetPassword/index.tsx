import { ErrorMessage, Field, Formik } from 'formik'
import React,{useState, useEffect} from 'react';
import {  Form } from 'react-bootstrap';
import { validationSchema } from '../../../utils/Validation';
import Button from '../../../common/button';

export const ForgotPassword = (props:any) => {
    const [message, setMessage] = useState(false)
    const initialValues = {
        newPassword: "",
        confirmPassword: "",
      };

      useEffect(()=>{

      },[])
    
      const handleSubmit = ()=>{
            console.log('in forgot')
            props.setPassword(false)
      }
  return (
    <div className={`${props.styles.container} `}>
    <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form
                className={` ${props.styles.form} `}
                onSubmit={formik.handleSubmit}
              >
                <h4 className="m-1">Forgot Password</h4>
                <div className={`${props.styles.formContent}`}>
                  <label>New Password</label>
                  <Field name="newPassword" type="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={`${props.styles.error} error`}
                  />
                </div>

                <div className={`${props.styles.formContent}`}>
                  <label>Confirm Password</label>
                  <Field name="confirmPassword" type="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={`${props.styles.error} error`}
                  />
                </div>
                <div className={`${props.styles.submit}`}>
                  {message ? (
                    <h6 className={`${props.styles.message} error`}>
                      Sorry! {message}
                    </h6>
                  ) : (
                    ""
                  )}
                  {/* <input type="submit" value={'btn'} onClick={handleSubmit} /> */}
                  <Button value={'Forgot Password'} className="forgot-btn" />
            
                </div>
              </Form>
            )}
          </Formik>
          </div>
  )
}

import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  firstName: Yup.string()
    .required("First Name is required")
    .matches(
      /^[A-Za-z]+$/,
      "First Name must contain only alphabetic characters"
    ),
  lastName: Yup.string()
    .required("Last Name is required")
    .matches(
      /^[A-Za-z]+$/,
      "First Name must contain only alphabetic characters"
    ),
  number: Yup.string()
    .min(10, "Number must be greater than or equal to 10")
    .required("Phone Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol, and be at least 8-16 characters long"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const letterValidationSchema = Yup.object().shape({
  fromCity: Yup.string().required("City is required"),
  fromProvince: Yup.string().required("Province is required"),
  fromCountry: Yup.string().required("Country is required"),
  weight: Yup.number()
    .required("Weight is required")
    .positive("Weight must be positive")
    .min(0.1, "Weight must be at least 0.1")
    .max(1000, "Weight cannot exceed 1000"),
  toCity: Yup.string().required("City is required"),
  toProvince: Yup.string().required("Province is required"),
  toCountry: Yup.string().required("Country is required"),
  insuranceAmount: Yup.number()
    .typeError("Insurance Amount must be a number")
    .positive("Insurance Amount must be positive")
    .min(0, "Insurance Amount cannot be negative"),
  agreeTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

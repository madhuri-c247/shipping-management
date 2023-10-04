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
  weight: Yup.number()
    .required("Weight is required")
    .positive("Weight must be positive")
    .min(0.1, "Weight must be at least 0.1")
    .max(1000, "Weight cannot exceed 1000"),
  insuranceAmount: Yup.number()
    .typeError("Insurance Amount must be a number")
    .positive("Insurance Amount must be positive")
    .min(0, "Insurance Amount cannot be negative"),
  agreeTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol, and be at least 8-16 characters long"
    ),
});

export const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const resetValidationSchema = Yup.object().shape({
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

export const GuestLetterValidationSchema = Yup.object().shape({
  fromCity: Yup.string().required('From City is required'),
  toCity: Yup.string().required('To City is required'),
  name: Yup.string()
  .required("Name is required")
  .matches(
    /^[A-Za-z]+$/,
    "First Name must contain only alphabetic characters"
  ),
  phone: Yup.string()
  .min(10, "Number must be greater than or equal to 10")
  .required("Phone Number is required"),
  email: Yup.string().email('Invalid email').required('Email is required'),
});
export const GuestPackageValidationSchema = Yup.object().shape({
  fromCity: Yup.string().required('From City is required'),
  toCity: Yup.string().required('To City is required'),
  name: Yup.string()
  .required("Name is required")
  .matches(
    /^[A-Za-z]+$/,
    "First Name must contain only alphabetic characters"
  ),
  package: Yup.number().min(0, 'Package must be a positive number').required('Package is required'),
  totalWeight: Yup.string().required('Total Weight is required'),
  phone: Yup.string()
  .min(10, "Number must be greater than or equal to 10")
  .required("Phone Number is required"),
  email: Yup.string().email('Invalid email').required('Email is required'),
});


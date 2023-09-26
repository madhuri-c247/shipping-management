const apiUrl = import.meta.env.VITE_API_URL;
export const SIGNUP_BASE_URL = `${apiUrl}/user/signup`;
export const LOGIN_BASE_URL = `${apiUrl}/login/loginAccount`;
export const FORGOT_PASSWORD_URL = `${apiUrl}/login/forget-password`;
export const YOUR_VERIFICATION_ENDPOINT = `${apiUrl}/mail/account-verification-mail?token=`;
export const RESET_PASSWORD_URL = `${apiUrl}/login/reset-password-verification?token=`;
export const POSTAL_URL = `${apiUrl}/postal/postalCode`;
export const LETTER_QUOTE_URL = `${apiUrl}/quote/new-letter`;

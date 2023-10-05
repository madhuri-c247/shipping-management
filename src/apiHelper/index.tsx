const apiUrl = import.meta.env.VITE_API_URL;
export const SIGNUP_BASE_URL = `${apiUrl}/user/signup`;
export const LOGIN_BASE_URL = `${apiUrl}/login/loginAccount`;
export const FORGOT_PASSWORD_URL = `${apiUrl}/login/forget-password`;
export const YOUR_VERIFICATION_ENDPOINT = `${apiUrl}/mail/account-verification-mail?token=`;
export const RESET_PASSWORD_URL = `${apiUrl}/login/reset-password-verification?token=`;
export const POSTAL_URL = `${apiUrl}/postal/postalCode`;
export const LETTER_QUOTE_URL = `${apiUrl}/quote/new-letter`;
export const USER_URL = `${apiUrl}/user/yourData`;
export const USER_PROFILE_URL = `${apiUrl}/user/profile`;
export const USER_UPDATE_URL = `${apiUrl}/user/user-settings`;
export const USER_DELETE_URL = `${apiUrl}/user/delete-user?token=`;
export const USER_DELETE_VERIFY_URL = `${apiUrl}/user/delete-verification`;
export const PACKAGE_QUOTE_URL = `${apiUrl}/quote/new-package`;
export const MY_SHIPMENT_URL = `${apiUrl}/quote/myShipping`;
export const SAVED_QUOTE_URL = `${apiUrl}/quote/saveQuote`;
export const STATUS_URL = `${apiUrl}/quote/status`;
export const GUEST_LETTER_QUOTE_URL = `${apiUrl}/quote/guest-letter`;
export const GUEST_PACKAGE_QUOTE_URL = `${apiUrl}/quote/guest-package`;
export const ADMIN_SAVED_QUOTES_URL = `${apiUrl}/admin/all-save-quote`;
export const ADMIN_ALL_USER_URL = `${apiUrl}/admin/allUser?search=&page=1&limit=2`;
export const ADMIN_ALL_SHIPMENT_URL = `${apiUrl}/admin/all-shipment-details`;
export const ADMIN_USER_UPDATE_URL = `${apiUrl}/admin/admin-update-user`;
export const ADMIN_USER_DELETE_URL = `${apiUrl}/admin/admin-delete-user`;

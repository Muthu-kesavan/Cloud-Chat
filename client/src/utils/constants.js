export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const VERIFY_OTP = `${AUTH_ROUTES}/verify-otp`
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`
export const UPDATE_PROFILE = `${AUTH_ROUTES}/update-profile`
export const UPLOAD_IMAGE = `${AUTH_ROUTES}/upload-image`
export const REMOVE_IMAGE = `${AUTH_ROUTES}/remove-image`
export const LOGOUT = `${AUTH_ROUTES}/logout`

export const CONTACT_ROUTES = "api/contacts"
export const SEARCH_CONTACTS = `${CONTACT_ROUTES}/search`
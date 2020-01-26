import {
  //   // Login
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  //   // Logout
  //   LOGOUT_SUCCESS,

  // Register
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  // Helper
  AUTH_LOADING,
  OTP_SENT_SUCCESS,
  OTP_SENT_FAIL,
  OLD_USER,
  NEW_USER,
  INCORRECT_PASSWORD
} from "../actions/types";

// registration status - 1. OTP not sent (normal) 2. OTP sending 3. Old user 1. OTP sent fail 5. OTP sent success 2. Verifying 6. OTP does not match 7. Register success
// login status -
// 1) Password login - 1. Normal 2. Verifying 3. New user 6. Login fail 7. Login success
// 2) OTP login - 1. Normal 2. OTP sending 3. New user 1. OTP sent fail 5. OTP sent success 2. Verifying 6. OTP does not match 7. Login success
const initialState = {
  registration_status: 1,
  login_status: 1,
  wrong_otp_count: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    // Register n otp login
    case AUTH_LOADING:
      return {
        ...state,
        login_status: 2,
        registration_status: 2
      };

    case OLD_USER:
    case NEW_USER:
      return {
        ...state,
        login_status: 3,
        registration_status: 3,
        wrong_otp_count: 0
      };

    case OTP_SENT_FAIL:
      return {
        ...state,
        login_status: 1,
        registration_status: 1
      };

    case OTP_SENT_SUCCESS:
      return {
        ...state,
        login_status: 5,
        registration_status: 5,
        wrong_otp_count: 0
      };

    // it deals with OTP
    case INCORRECT_PASSWORD:
      return {
        ...state,
        login_status: 1,
        registration_status: 1,
        wrong_otp_count: state.wrong_otp_count + 1
      };

    // it deals with OTP
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        login_status: 6,
        registration_status: 6,
        wrong_otp_count: state.wrong_otp_count + 1
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        login_status: 7,
        registration_status: 7
      };

    default:
      return state;
  }
}

import {
  AUTH_LOADING,
  OTP_SENT_SUCCESS,
  NEW_USER,
  OTP_SENT_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL
} from "../actions/types";

// registration status - 1. OTP not sent (normal) 2. OTP sending 3. OTP sent failed 4. OTP sent success 5. wrong otp 6. correct otp
const initialState = {
  update_status: 1,
  wrong_otp_count: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        update_status: 2
      };

    case OTP_SENT_FAIL:
      return {
        ...state,
        update_status: 3
      };

    case NEW_USER:
    case OTP_SENT_SUCCESS:
      return {
        ...state,
        update_status: 4,
        wrong_otp_count: 0
      };

    case USER_UPDATE_FAIL:
      return {
        ...state,
        update_status: 5,
        wrong_otp_count: state.wrong_otp_count + 1
      };

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        update_status: 6
      };

    default:
      return state;
  }
}

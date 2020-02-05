import axios from "axios";
import { createMessage } from "./messages";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  OTP_SENT_SUCCESS,
  OTP_SENT_FAIL,
  NEW_USER,
  // Login
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  INCORRECT_PASSWORD,
  // Logout
  LOGOUT_SUCCESS,
  // Register
  OLD_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_LOADING,

  // update user
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL
} from "./types";

// check token & load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_LOADING });

  axios
    .get("http://localhost:8000/api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: AUTH_ERROR });
      console.log(err.message);
    });
};

// send otp

export const send_otp = email => (dispatch, getState) => {
  dispatch({ type: AUTH_LOADING });

  axios
    .post(
      "http://localhost:8000/api/requestotp",
      JSON.stringify({ email }),
      tokenConfig(getState)
    )
    .then(res => {
      if (res.data.old_user) {
        dispatch({
          type: OTP_SENT_SUCCESS
        });
      } else if (res.data.new_user) {
        dispatch({
          type: NEW_USER
        });
      }
    })
    .catch(err => {
      console.log("Hey that's an error :", err);
      dispatch({
        type: OTP_SENT_FAIL
      });
    });
};

// update user profile

export const updateUserProfile = data => (dispatch, getState) => {
  axios
    .post(
      "http://localhost:8000/api/auth/userprofile",
      JSON.stringify(data),
      tokenConfig(getState)
    )
    .then(res => {
      console.log(res);
      dispatch(createMessage({ success: "Profile updated successfully" }));
    })
    .catch(err => {
      console.log(err.message);
      dispatch(createMessage({ error: "Profile updated failed" }));
    });
};

// update user

export const updateUser = data => (dispatch, getState) => {
  axios
    .post(
      "http://localhost:8000/api/auth/userupdate",
      JSON.stringify(data),
      tokenConfig(getState)
    )
    .then(res => {
      if (res.data.user) {
        dispatch({ success: "Info updated successfully" });
        dispatch({
          type: USER_UPDATE_SUCCESS
        });
      } else {
        dispatch({ error: "Info update failed" });
        dispatch({
          type: USER_UPDATE_FAIL
        });
      }
    })
    .catch(err => {
      dispatch({
        type: USER_UPDATE_FAIL
      });
      console.log(err.message);
    });
};

// Login functions

// Login using password
export const login = (email, password) => (dispatch, getState) => {
  dispatch({ type: AUTH_LOADING });

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("http://localhost:8000/api/auth/pwlogin", body, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ success: "Welcome" }));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(createMessage({ error: "Incorrect credential" }));
      dispatch({ type: INCORRECT_PASSWORD });
    });
};

// Login using OTP
export const otpLogin = (email, otp) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({ email, otp });

  axios
    .post(
      "http://localhost:8000/api/auth/otplogin",
      body,
      tokenConfig(getState)
    )
    .then(res => {
      if (res.data.error) {
        dispatch(createMessage({ error: "Wrong OTP" }));
        dispatch({ type: LOGIN_FAIL });
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch(err => {
      dispatch(createMessage({ error: "Login failed" }));
      dispatch({ type: LOGIN_FAIL });
      console.log("there is an error while loading the user");
    });
};

// Logout user
export const logout = () => (dispatch, getState) => {
  axios
    .post("http://localhost:8000/api/auth/logout", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("there is an error while loading the user");
    });
};

// ***********************************************************************
// ***********************************************************************

// Register user

// send otp
export const send_register_otp = email => (dispatch, getState) => {
  dispatch({ type: AUTH_LOADING });

  axios
    .post(
      "http://localhost:8000/api/requestotp",
      JSON.stringify({ email }),
      tokenConfig(getState)
    )
    .then(res => {
      if (res.data.new_user) {
        dispatch({
          type: OTP_SENT_SUCCESS
        });
      } else if (res.data.old_user) {
        dispatch({
          type: OLD_USER
        });
      }
    })
    .catch(err => {
      console.log("Hey that's an error :", err);
      dispatch({
        type: OTP_SENT_FAIL
      });
    });
};

// register a new user
export const register_new_user = (email, password, otp) => (
  dispatch,
  getState
) => {
  dispatch({ type: AUTH_LOADING });

  // Request body
  const body = JSON.stringify({ email, password, otp });

  axios
    .post(
      "http://localhost:8000/api/auth/register",
      body,
      tokenConfig(getState)
    )
    .then(res => {
      if (res.data.user) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        });
      } else {
        dispatch({
          type: REGISTER_FAIL
        });
      }
    })
    .catch(err =>
      console.log("Hey that's an error from register :", err.message)
    );
};

// ***********************************************************************
// ***********************************************************************

// Setup config with token - helper function

export const tokenConfig = getState => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};

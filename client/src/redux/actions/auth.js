import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("/api/register", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser())
      alert("User register successfully");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => alert(error.msg));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post("/api/login", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser())
      // alert("User login successfully");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => alert(error.msg));
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

  export const logout = () => (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
    alert('Logout successful');
  };
  

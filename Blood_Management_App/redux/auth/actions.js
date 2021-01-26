import axios from 'axios';
import {
  RETRIEVE_TOKEN,
  LOGIN_REQ,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQ,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from './actionTypes';

export const loginReq = () => ({
  type: LOGIN_REQ,
});

export const loginSuccess = (response) => ({
  type: LOGIN_SUCCESS,
  payload: response,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const logUserIn = (loginData) => {
  return async (dispatch) => {
    dispatch(loginReq());
    console.log("login works");
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        loginData,
      );
      //*coordinate with back end about this structure of response.
      if (response.error) {
        dispatch(loginFailure(response.error));
      } else {
        //todo change this from response.data to response or based on the strucure of response.
        dispatch(loginSuccess(response.data));
      }
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const registerReq = () => ({
  type: REGISTER_REQ,
});

export const registerSuccess = (response) => ({
  type: REGISTER_SUCCESS,
  payload: response,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const regUserUp = (regData) => {
  console.log('called');
  return async (dispatch) => {
    dispatch(registerReq());
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        regData,
      );
      //*coordinate with back end about this structure of response.
      //* IN CASE OF REGISTER, THIS IS USED TO SHOW ERRORS LIKE EMAIL ALREADY EXISTS AND THINGS LIKE THAT.
      if (response.error) {
        dispatch(registerFailure(response.error));
      } else {
        //todo change this from response.data to response or based on the strucure of response.
        dispatch(registerSuccess(response.data));
      }
    } catch (err) {
      dispatch(registerFailure(err.message));
    }
  };
};

//////////////////////////////////////////////////// todo req, success and failure action creators /////////////////////////////////////////////

export const logout = () => ({
  type: LOGOUT,
});

export const retrieveToken = (token) => ({
  type: RETRIEVE_TOKEN,
  token: token,
});

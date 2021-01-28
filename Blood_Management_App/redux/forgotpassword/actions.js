/* eslint-disable prettier/prettier */
import axios from 'axios';
import {
  UPDATE_FIELDS_FORGOT,
  BLUR_FIELDS_FORGOT,
  STATE_CLEANUP_FORGOT,
  FORGOT_REQ,
  FORGOT_REQ_SUCCESS,
  FORGOT_REQ_FAILURE,
  RESET_DONE_STATE,
} from './actionTypes';

export const updateFields = (val, fieldId, isValid) => ({
  type: UPDATE_FIELDS_FORGOT,
  val: val,
  fieldId: fieldId,
  isValid: isValid,
});

export const blurFields = (fieldId) => ({
  type: BLUR_FIELDS_FORGOT,
  fieldId: fieldId,
});

export const stateCleanup = () => ({type: STATE_CLEANUP_FORGOT});
//////////////////////////////////////////////////////////////////////////////

export const forgotReq = () => ({type: FORGOT_REQ});

export const forgotReqFailure = (error) => ({
  type: FORGOT_REQ_FAILURE,
  error: error,
});

export const forgotReqSuccess = (successReq) => ({
  type: FORGOT_REQ_SUCCESS,
  successReq: successReq,
});

export const resetDoneState = (resettable) => ({
  type: RESET_DONE_STATE,
  resettable: resettable,
});

////////////////////////////////////////////////////////////////////////////

//THUNK ACTION TO POST EMAIL

export const postEmail = (email) => {
  return async (dispatch) => {
    dispatch(forgotReq());
    try {
      const response = await axios.post(
        'http://192.168.43.89:5000/forgotpassword',
        {
          recoveryEmail: email,
        },
      );
      if (response.data.error) {
        dispatch(forgotReqFailure(response.data.error));
        console.log('Error while posting recovery email', response.data.error);
        //* COORDINATE WITH BACK END TEAM TO ADD A BOOLEAN SUCCESS FLAG HERE.
      } else if (response.data.success) {
        dispatch(forgotReqSuccess('emailSent'));
      } else {
        dispatch(forgotReqFailure("Something's not right!"));
      }
    } catch (err) {
      console.log('Caught error while posting recovery email', err);
      dispatch(forgotReqFailure(err.message));
    }
  };
};

//THUNK ACTION TO POST OTP

export const postOTP = (otp) => {
  return async (dispatch) => {
    dispatch(forgotReq());
    try {
      const response = await axios.post('http://192.168.43.89:5000/otp', {
        otp: otp,
      });
      if (response.data.error) {
        dispatch(forgotReqFailure(response.data.error));
        console.log('Error while posting otp', response.data.error);
        //* COORDINATE WITH BACK END TEAM TO ADD A BOOLEAN SUCCESS FLAG HERE.
      } else if (response.data.success) {
        dispatch(forgotReqSuccess('otpVerified'));
      } else {
        dispatch(forgotReqFailure("Something's not right!"));
      }
    } catch (err) {
      console.log('Caught error while posting recovery email', err);
      dispatch(forgotReqFailure(err.message));
    }
  };
};

//THUNK ACTION TO POST PASSWORD

export const postResetPassword = (password) => {
  return async (dispatch) => {
    dispatch(forgotReq());
    try {
      const response = await axios.post('http://192.168.43.89:5000/resetpwd', {
        password: password,
      });
      if (response.data.error) {
        dispatch(forgotReqFailure(response.data.error));
        console.log('Error while posting reset password', response.data.error);
        //* COORDINATE WITH BACK END TEAM TO ADD A BOOLEAN SUCCESS FLAG HERE.
      } else if (response.data.success) {
        dispatch(forgotReqSuccess('passwordReset'));
      } else {
        dispatch(forgotReqFailure("Something's not right!"));
      }
    } catch (err) {
      console.log('Caught error while posting reset password', err);
      dispatch(forgotReqFailure(err.message));
    }
  };
};

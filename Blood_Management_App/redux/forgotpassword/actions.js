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

export const stateCleanup = () => ({ type: STATE_CLEANUP_FORGOT });
//////////////////////////////////////////////////////////////////////////////

export const forgotReq = () => ({ type: FORGOT_REQ });

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
  console.log(email);
  return async (dispatch) => {
    dispatch(forgotReq());
    dispatch(resetDoneState('emailSent'));
    try {
      const response = await axios.post(
        'http://10.0.2.2:8080/email/sendotp',
        {
          userEmail: email,
        },
      );
      console.log(response.data);
      if (!response.data.success) {
        dispatch(
          forgotReqFailure(
            'The provided email is not currently registered with us.',
          ),
        );
        console.log(
          'Error while posting recovery email'
        );
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

export const postOTP = (email, otp) => {
  return async (dispatch) => {
    dispatch(forgotReq());
    dispatch(resetDoneState('otp'));
    try {
      const response = await axios.post(
        'http://10.0.2.2:8080/email/verifyotp',
        {
          userEmail: email,
          otp,
        },
      );
      if (!response.data.success) {
        dispatch(forgotReqFailure('Invalid OTP, try again!'));
        console.log('Error while posting otp');
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

export const postResetPassword = (email, password) => {
  return async (dispatch) => {
    dispatch(forgotReq());
    try {
      const response = await axios.put(
        'http://10.0.2.2:8080/profile/resetpassword',
        {
          userEmail: email,
          newPassword: password,
        },
      );
      if (response.headers.error) {
        dispatch(forgotReqFailure(response.headers.error));
        console.log(
          'Error while posting reset password',
          response.headers.error,
        );
      } else if (response.headers.success) {
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

/* eslint-disable prettier/prettier */
import axios from 'axios';
import {
  UPDATE_FIELDS_CHANGE,
  CHANGE_REQ,
  CHANGE_REQ_SUCCESS,
  CHANGE_REQ_FAILURE,
  BLUR_FIELDS_CHANGE,
  STATE_CLEANUP_CHANGE,
  RESET_DONE_STATE,
} from './actionTypes';

export const updateFields = (val, fieldId, isValid) => ({
  type: UPDATE_FIELDS_CHANGE,
  val: val,
  fieldId: fieldId,
  isValid: isValid,
});

export const blurFields = (fieldId) => ({
  type: BLUR_FIELDS_CHANGE,
  fieldId: fieldId,
});

export const stateCleanup = () => ({type: STATE_CLEANUP_CHANGE});
//////////////////////////////////////////////////////////////////////////////

export const changeReq = () => ({type: CHANGE_REQ});

export const changeReqFailure = (error) => ({
  type: CHANGE_REQ_FAILURE,
  error: error,
});

export const changeReqSuccess = (successReq) => ({
  type: CHANGE_REQ_SUCCESS,
  successReq: successReq,
});

export const resetDoneState = () => ({
  type: RESET_DONE_STATE,
});

////////////////////////////////////////////////////////////////////////////////////////////

export const postCurrentPassword = (password) => {
  return async (dispatch) => {
    dispatch(changeReq());
    try {
      const response = await axios.post(
        'http://API URI HERE:5000/changepassword',
        {
          currPassword: password,
        },
      );
      if (response.data.error) {
        dispatch(changeReqFailure(response.data.error));
        console.log('Error while posting old password', response.data.error);
      } else if (response.data.success) {
        dispatch(changeReqSuccess('emailSent'));
      } else {
        dispatch(changeReqFailure("Something's not right!"));
      }
    } catch (err) {
      console.log('Caught error while posting current password', err);
      dispatch(changeReqFailure(err.message));
    }
  };
};

////////////////////////////////////////////////////////////////////////////////////////

export const postResetPassword = (password) => {
  return async (dispatch) => {
    dispatch(changeReq());
    try {
      //*axios put request
      const response = await axios.put('http://API URI HERE:5000/resetpwd', {
        password: password,
      });
      if (response.data.error) {
        dispatch(changeReqFailure(response.data.error));
        console.log('Error while posting reset password', response.data.error);
      } else if (response.data.success) {
        dispatch(changeReqSuccess('passwordReset'));
      } else {
        dispatch(changeReqFailure("Something's not right!"));
      }
    } catch (err) {
      console.log('Caught error while posting reset password', err);
      dispatch(changeReqFailure(err.message));
    }
  };
};

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

/////////////////////////////////////////////////////////////////////////////////////////////////

export const changeReq = () => ({type: CHANGE_REQ});

export const changeReqFailure = (error) => ({
  type: CHANGE_REQ_FAILURE,
  error: error,
});

export const changeReqSuccess = (successReq) => ({
  type: CHANGE_REQ_SUCCESS,
  successReq: successReq,
});

export const resetDoneState = (currScreen) => ({
  type: RESET_DONE_STATE,
  currScreen,
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const postCurrentPassword = (userToken, password) => {
  return async (dispatch) => {
    dispatch(changeReq());
    dispatch(resetDoneState('currPassword'));

    try {
      const response = await axios.post(
        'http://192.168.43.89:5000/currentpassword',
        {password},
        {
          headers: {Authorization: userToken},
        },
      );
      if (response.data.error) {
        dispatch(changeReqFailure(response.data.error));
        console.log(
          'Error while posting current password',
          response.data.error,
        );
      } else if (response.data.success) {
        dispatch(changeReqSuccess('passwordSent'));
      } else {
        dispatch(changeReqFailure("Something's not right!"));
      }
    } catch (err) {
      console.log('Caught error while posting current password', err);
      dispatch(changeReqFailure(err.message));
    }
  };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const postResetPassword = (userToken, password) => {
  return async (dispatch) => {
    dispatch(changeReq());
    dispatch(resetDoneState('newPassword'));

    try {
      const response = await axios.put(
        'http://192.168.43.89:5000/makenewpwd',
        {password},
        {
          headers: {Authorization: userToken},
        },
      );
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
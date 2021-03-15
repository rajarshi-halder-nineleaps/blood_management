import axios from 'axios';
// import {regUserUp} from '../auth/actions';
import {
  UPDATE_FIELDS_REG,
  BLUR_FIELDS_REG,
  ADD_PHONE_STATE,
  PHONE_STATE_SET,
  PHONE_TOUCH_SET,
  STATE_CLEANUP,
  REMOVE_PHONE,
  UPDATE_OTP,
  BLUR_OTP,
  REQ_VERIFICATION_SUCCESS,
  REQ_VERIFICATION_FAILURE,
  REQ_VERIFICATION,
  SET_USER_VERIFIED,
  RESET_OTP_STATE,
} from './actionTypes';

export const updateFields = (val, fieldId, isValid) => ({
  type: UPDATE_FIELDS_REG,
  val: val,
  fieldId: fieldId,
  isValid: isValid,
});

export const blurFields = (fieldId) => ({
  type: BLUR_FIELDS_REG,
  fieldId: fieldId,
});

export const addPhoneState = () => ({
  type: ADD_PHONE_STATE,
});

export const removePhone = () => ({
  type: REMOVE_PHONE,
});

export const phoneStateSet = (val, idx) => ({
  type: PHONE_STATE_SET,
  val: val,
  idx: idx,
});

export const phoneTouchSet = (idx) => ({
  type: PHONE_TOUCH_SET,
  idx: idx,
});

export const stateCleanup = () => ({
  type: STATE_CLEANUP,
});

export const updateOtp = (val, validity) => ({
  type: UPDATE_OTP,
  val,
  validity,
});

export const blurOtp = () => ({
  type: BLUR_OTP,
});

export const req = () => ({
  type: REQ_VERIFICATION,
});

export const reqSuccess = () => ({
  type: REQ_VERIFICATION_SUCCESS,
});

export const reqFailure = (error) => ({
  type: REQ_VERIFICATION_FAILURE,
  error: error,
});

export const setUserVerified = (verified) => ({
  type: SET_USER_VERIFIED,
  verified,
});

export const resetOtpState = () => ({
  type: RESET_OTP_STATE,
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//? ASYNCHRONOUS ACTION CREATORS.

export const sendOtp = (email, otpNavigationHandler) => {
  return async (dispatch) => {
    try {
      console.log('sending otp.');
      dispatch(req());
      const response = await axios.post(
        'http://10.0.2.2:8080/verification/sendotp',
        { userEmail: email.trim() },
      );

      if (response.headers.success) {
        console.log('response is success!');
        dispatch(reqSuccess());
        otpNavigationHandler();
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(reqFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          reqFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on sending verification otp: ', err);
      dispatch(reqFailure(err.message));
    }
  };
};

export const verifyOTP = (userEmail, otp, registerUser) => {
  return async (dispatch) => {
    try {
      console.log('verifying otp.');
      dispatch(req());
      const response = await axios.post(
        'http://10.0.2.2:8080/verification/verifyotp',
        { userEmail: userEmail.trim(), otp },
      );

      if (response.headers.success) {
        console.log('Data', response.data);
        console.log('response is success!');
        dispatch(reqSuccess());

        //* HERE, WE DISPATCH THE REGISTER ACTION BEACUSE THE USER EMAIL HAS SUCCESFULLY BEEN VERIFIED.
        registerUser();
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(reqFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          reqFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on verifying verify otp: ', err);
      dispatch(reqFailure(err.message));
    }
  };
};
